import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/services/request.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    connected:boolean;


    //form:FormGroup;

    constructor(private fb:FormBuilder,
                 private authService: RequestService,
                 private router: Router) {

        /* Check Token to connect or not */
        this.connected = this.authService.isLoggedIn() ? true : false;

        // this.form = this.fb.group({
        //     email: ['',Validators.required],
        //     password: ['',Validators.required]
        // });
    }

    ngOnInit(): void {
    }

}
