﻿import { fakeAsync, tick, flush } from '@angular/core/testing';
import { FormGroup,FormArray } from "@angular/forms"
import { InputBindingComponent } from "./components/input-binding.component"
import { ReactiveFormConfig, FormControlConfig } from "@rxweb/reactive-form-validators"
import { inputProcessor }  from '../component-processor/input-processor'


describe('FormControlConfig Properties', () => {

    describe('formControl', () => {
        beforeEach(() => {
            ReactiveFormConfig.set({
                "dynamicForm": {
                    "uiFramework": "bootstrap"
                }
            });
        })    

        it('root level formcontrol', fakeAsync(() => {
            let options = inputProcessor({ component: InputBindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox" }], tagName: 'input' })
            options.instance.serverData.forEach(t => {
                expect(options.instance.dynamicFormBuildConfig.formGroup.controls[t.name]).toBeDefined();
                expect(options.instance.dynamicFormBuildConfig.controlsConfig[t.name].formControl).toEqual(options.instance.dynamicFormBuildConfig.formGroup.controls[t.name]);
            })
        }));

        it('nested formgroup formcontrols', fakeAsync(() => {
            let options = inputProcessor({ component: InputBindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox" }, { name: "address.name", type: "textbox" }], tagName: 'input' })
            options.instance.serverData.forEach(t => {
                var splitText = t.name.split('.');
                if (splitText.length == 1) {
                    expect(options.instance.dynamicFormBuildConfig.formGroup.controls[t.name]).toBeDefined();
                    expect(options.instance.dynamicFormBuildConfig.controlsConfig[t.name].formControl).toEqual(options.instance.dynamicFormBuildConfig.formGroup.controls[t.name]);
                } else {
                    expect(options.instance.dynamicFormBuildConfig.formGroup.controls[splitText[0]]).toBeDefined();
                    let nestedFormGroup = options.instance.dynamicFormBuildConfig.formGroup.controls[splitText[0]] as FormGroup;
                    expect(nestedFormGroup.controls[splitText[1]]).toBeDefined();
                }
                
            })
        }));

        it('nested formarray should not defined', fakeAsync(() => {
            let options = inputProcessor({
                component: InputBindingComponent, serverData:
                    [
                        { name: "firstName", type: "textbox" },
                        { name: "lastName", type: "textbox" },
                        { name: "address.name", type: "textbox" },
                        {
                            name: "hobbies",
                            type: "array",
                            controlConfigs: {
                                name: {
                                    type: 'textbox',
                                    actionKeyNames: [],
                                    validators: {
                                        required: true
                                    },
                                    ui: {
                                        label: 'Name',
                                        placeholder: 'Enter your User Name',
                                        description: 'Enter the details of your userName'
                                    }
                                }
                            },
                        }
                    ], tagName: 'input'
            })
            options.instance.serverData.forEach(t => {
                if (t.type != "array") {
                    var splitText = t.name.split('.');
                    if (splitText.length == 1) {
                        expect(options.instance.dynamicFormBuildConfig.formGroup.controls[t.name]).toBeDefined();
                        expect(options.instance.dynamicFormBuildConfig.controlsConfig[t.name].formControl).toEqual(options.instance.dynamicFormBuildConfig.formGroup.controls[t.name]);
                    } else {
                        expect(options.instance.dynamicFormBuildConfig.formGroup.controls[splitText[0]]).toBeDefined();
                        expect(options.instance.dynamicFormBuildConfig.formGroup.controls[splitText[0]] instanceof FormGroup).toBeTruthy();
                        let nestedFormGroup = options.instance.dynamicFormBuildConfig.formGroup.controls[splitText[0]] as FormGroup;
                        expect(nestedFormGroup.controls[splitText[1]]).toBeDefined();
                    }
                } else {
                    expect(options.instance.dynamicFormBuildConfig.formGroup.controls[t.name]).toBeUndefined();

                }
            })
        }));




        



        //end
    })

})