import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentManagementService } from './content-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css'],
  providers: [ContentManagementService]
})
export class ContentManagementComponent implements OnInit {
  contactForm: FormGroup;
  financialInfoForm: FormGroup;
  aboutUsForm: FormGroup;
  faqForm: FormGroup;
  termsForm: FormGroup;
  sliderForm: FormGroup;

  filesToUpload: Array<File> = [];
  imagePath;

  sliderData;

  companyName;
  streetAddress;
  city;
  zone;
  country;
  phone;
  email;
  discountCorporate;
  discountIndividual;
  profitMargin;
  taxRate;

  general;
  generalLength;


  constructor(private router: Router, private fb: FormBuilder, private contentService: ContentManagementService) { 
  	this.contactForm = fb.group({
  		
  		'companyName': [null, Validators.required],
  		'streetAddress': [null, Validators.required],
  		'city': [null, Validators.required],
  		'zone': [null, Validators.required],
  		'country': [null, Validators.required],
  		'phone': [null, Validators.compose([Validators.required, Validators.minLength(10)])],
  		'email': [null, Validators.required],
  		
  	});

  	this.financialInfoForm = fb.group({

  		'discountCorporate': [null, Validators.required],
  		'discountIndividual': [null, Validators.required],
  		'profitMargin': [null, Validators.required],
  		'taxRate': [null, Validators.required],
  	
  	});

    this.aboutUsForm = fb.group({
      'aboutField': [null, Validators.required],
    });

    this.termsForm = fb.group({
      'termsField': [null, Validators.required],
    });

    this.sliderForm = fb.group({
      'heading': [null, Validators.required],
      'subHeading': [null, Validators.required],
      'description': [null, Validators.required],
    })

    this.faqForm = fb.group({
      'faqQuestion': [' ',Validators.required],
      'faqAnswer': [' ', Validators.required],
    })

    this.contentService.getActiveHomepageSlider().subscribe((data) => {
      this.sliderData = data;
    })

    this.contentService.getAllGeneral().subscribe((general) => {
        this.general = general;
        this.generalLength = this.general.length;
    });


  }

  ngOnInit() {
  	const phoneField = <HTMLInputElement>document.getElementById('phone');
  	phoneField.oninput = function(){
  		if(phoneField.value.length < 10){
  			var glyphicon = document.getElementById('glyphicon');
  			glyphicon.setAttribute('class', 'glyphicon glyphicon-remove');

  			const phoneError = document.getElementById('phoneError');
  			phoneError.innerHTML = "Phone number must be of at least 10 digits";
  		} else {
  			
  			var glyphicon = document.getElementById('glyphicon');
  			glyphicon.setAttribute('class', 'glyphicon glyphicon-ok');

  			const phoneError = document.getElementById('phoneError');
  			phoneError.innerHTML = "";
  		}
  	}
  }

  changeToFinancialInformation(){
  	var financialInformation = document.getElementById('financialInfo');
  	financialInformation.setAttribute('class', 'active');

  	var updateContact = document.getElementById('updateContact');
  	updateContact.removeAttribute('class');
  }

  addContent(contactForm: FormGroup,financeForm: FormGroup):void{
  	var newContent = {
  		
  		companyName: contactForm.value.companyName,
  		streetAddress: contactForm.value.streetAddress,
  		city: contactForm.value.city,
  		zone: contactForm.value.zone,
  		country: contactForm.value.country,
  		phone: contactForm.value.phone,
  		email: contactForm.value.email,

  		discountCorporate: financeForm.value.discountCorporate,
  		discountIndividual: financeForm.value.discountIndividual,
  		profitMargin: financeForm.value.profitMargin,
  		taxRate: financeForm.value.taxRate

  	}
  	// console.log(newContent);

  	this.contentService.addContent(newContent).subscribe(() => {});
    alert("New Content was successfully saved");
    this.router.navigate(['/pricingManagement']);
    location.reload();


  }

  addAboutUs(aboutUsForm: FormGroup) {

    var aboutField = aboutUsForm.value.aboutField;

    var newAbout = {
      aboutField: aboutField,
      addedBy: '1',
      commitComment: 'Added by admin with login ID: 1, on, ' + new Date(),
    }

    this.contentService.addAboutUs(newAbout).subscribe(() => {});
    alert("About Us Successfully added");
    location.reload();


  }

  addTerms(termsForm: FormGroup) {
    var termsField = termsForm.value.termsField;

    var newTerms = {
      termsField: termsField,
      addedBy: '1',
      commitComment: 'Added by admin with login ID: 1 on, ' + new Date(),
    }

    this.contentService.addTerms(newTerms).subscribe(() => {});
    alert("Terms and conditions successfully added");
    location.reload();

  }

  addFaq(faqForm: FormGroup) {
    var faqQuestion = faqForm.value.faqQuestion;
    var faqAnswer = faqForm.value.faqAnswer;

    var newFaq = {
      faqQuestion: faqQuestion,
      faqAnswer: faqAnswer,
      loginID: '1',
      commitComment: 'Added By Admin with login ID: 1. Added On: '+new Date(),
    }

    this.contentService.addFaq(newFaq).subscribe(() => {});
  }

  addHomePageSlider(sliderForm: FormGroup){
    // console.log('We here')
    var heading = sliderForm.value.heading;
    var subHeading = sliderForm.value.subHeading;
    var description = sliderForm.value.description;

    var newSlider = {
      heading: heading,
      subHeading: subHeading,
      description: description,
      hrefUrl: "http://apips.krennovatech.com/banners/"+this.imagePath,
      imagePath: this.imagePath,
      status: 'active',
    }

    // console.log(newSlider);
    this.contentService.addHomePageSlider(newSlider).subscribe(() => {});
    
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

      if(files[0] == undefined){
          //Do Nothing
      } else{
          formData.append('banners[]', files[0], files[0]['name']);

          this.contentService.addImage(formData).subscribe( files => console.log('files', files));
      }

      this.contentService.addImage(formData).subscribe((files) => {console.log(files)});

      alert("Slider successfully added");
      location.reload();


  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.imagePath = fileInput.target.files[0]['name'];
  }

}
