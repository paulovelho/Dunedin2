import{a as V,b as d,c as A}from"./chunk-LOL3TW3O.js";import{a as X}from"./chunk-K3XDBYVD.js";import{$a as M,Aa as U,B as r,Ba as _,C as a,D as p,Da as N,Ea as F,F as u,Fa as I,Ha as T,I as D,Ia as P,J as R,K as L,O as w,P as C,R as H,S as f,T as h,Xa as j,Y as k,_a as E,ab as q,bb as K,cb as Q,eb as G,i as B,l as v,m as O,qa as W,ra as z,s,t as m,wa as S,xa as b,ya as y,z as l,za as J}from"./chunk-N3QAHXRB.js";var Z=(()=>{let i=class i{constructor(t,o,e,c,g){this.transloco=t,this.formService=o,this.toaster=e,this.nav=c,this.service=g,this.loading=!1,this.languages=[]}ngOnInit(){this.loadLanguages(),this.buildForm(),this.getMyself()}getMyself(){this.loading=!0,this.service.getMyAccount().subscribe({next:t=>{this.user=t,this.loading=!1,this.setUser(t)}})}loadLanguages(){this.languages=K(X)}buildForm(){this.form=this.formService.Build(["name","email","phone_number","language"],["name","email","language"])}setUser(t){this.formService.setObject(this.form,t)}goToPasswordChange(){this.nav.changePassword()}save(){this.loading=!0;let t=this.formService.validate(this.form);if(!t.valid)this.toaster.error(t.errorString);else{let o=t.data;if(!o){this.toaster.warning("Nothing to save");return}o.id=this.user?.id,this.service.saveMyData(o).subscribe({next:e=>{e&&this.toaster.success(this.transloco.translate("save-success-general"))},error:e=>{console.error(e),this.toaster.error("ERROR SAVING DATA")},complete:()=>this.loading=!1})}}};i.\u0275fac=function(o){return new(o||i)(m(T),m(A),m(j),m(z),m(d))},i.\u0275cmp=v({type:i,selectors:[["app-account-home"]],standalone:!0,features:[w([V,d]),C],decls:24,vars:14,consts:[["icon","fa-user",3,"loading","showClose","title"],[3,"formGroup"],[1,"row"],[1,"col-sm-4"],["id","name","formControlName","name","label","users.title-name",3,"required"],["id","email","formControlName","email","label","users.title-email","type","disabled"],["id","phone_number","formControlName","phone_number","label","users.title-phone"],[1,"col-sm-2"],["id","language","formControlName","language","label","users.title-language",3,"options","required"],[1,"col-sm-7","label-margin"],[1,"role-title"],[1,"role-value"],[1,"col-sm-3","label-margin"],["type","primary","caption","my-account.change-password",3,"action"],[1,"col-sm-6","offset-sm-6"],["type","save",3,"action","loading"]],template:function(o,e){o&1&&(r(0,"app-window",0),f(1,"transloco"),r(2,"form",1)(3,"div",2)(4,"div",3),p(5,"app-input",4),a(),r(6,"div",3),p(7,"app-input",5),a(),r(8,"div",3),p(9,"app-input",6),a()(),r(10,"div",2)(11,"div",7),p(12,"app-select",8),a(),r(13,"div",9)(14,"span",10),D(15),f(16,"transloco"),a(),r(17,"span",11),D(18),a()(),r(19,"div",12)(20,"app-button",13),u("action",function(){return e.goToPasswordChange()}),a()()(),r(21,"div",2)(22,"div",14)(23,"app-button",15),u("action",function(){return e.save()}),a()()()()()),o&2&&(l("loading",e.loading)("showClose",!1)("title",h(1,10,"my-account.title")),s(2),l("formGroup",e.form),s(3),l("required",!0),s(7),l("options",e.languages)("required",!0),s(3),L("",h(16,12,"users.title-roleName"),":"),s(3),R(e.user==null?null:e.user.role),s(5),l("loading",e.loading))},dependencies:[G,_,b,y,I,N,F,E,M,q,Q,P],styles:[".role-title[_ngcontent-%COMP%]{font-weight:700;margin:0 20px}"]});let n=i;return n})();var pe=n=>({"form-validate":n}),$=(()=>{let i=class i{constructor(t,o,e,c){this.transloco=t,this.formService=o,this.toaster=e,this.service=c,this.loading=!1,this.passwordMatchingValidator=g=>{let ee=g.get("password"),te=g.get("match_password");return ee?.value===te?.value?null:{notmatched:!0}}}ngOnInit(){this.buildForm()}buildForm(){this.form=new J({password:new U(null,[S.required,S.minLength(10)]),match_password:new U(null,[S.required])},{validators:this.passwordMatchingValidator})}genPassword(){let t=Math.random().toString(36).slice(-10);this.form?.controls.password.setValue(t),this.form?.controls.match_password.setValue(t)}save(){let t=this.formService.validate(this.form);if(!t.valid){this.toaster.error(t.errorString);return}this.loading=!0;let o=this.form?.controls.password.value;this.service.changePassword(o).subscribe({next:e=>{console.info("rs",e),e&&this.toaster.success(this.transloco.translate("save-success-general")),this.loading=!1},error:e=>{this.toaster.error(this.transloco.translate("error-general")),this.loading=!1}})}};i.\u0275fac=function(o){return new(o||i)(m(T),m(A),m(j),m(d))},i.\u0275cmp=v({type:i,selectors:[["app-change-password"]],standalone:!0,features:[w([V,d]),C],decls:13,vars:12,consts:[["icon","fa-lock",3,"loading","showClose","title"],[3,"formGroup","ngClass"],[1,"row"],[1,"col-sm-4"],["id","password","formControlName","password","label","my-account.password",3,"required"],["id","password","formControlName","match_password","label","my-account.password-check",3,"required"],[1,"col-sm-4","label-margin"],["type","primary","caption","my-account.generate-password",3,"action"],[1,"col-sm-6","offset-sm-6"],["type","save",3,"action","loading"]],template:function(o,e){o&1&&(r(0,"app-window",0),f(1,"transloco"),r(2,"form",1)(3,"div",2)(4,"div",3),p(5,"app-input",4),a(),r(6,"div",3),p(7,"app-input",5),a(),r(8,"div",6)(9,"app-button",7),u("action",function(){return e.genPassword()}),a()()(),r(10,"div",2)(11,"div",8)(12,"app-button",9),u("action",function(){return e.save()}),a()()()()()),o&2&&(l("loading",e.loading)("showClose",!1)("title",h(1,8,"my-account.change-password")),s(2),l("formGroup",e.form)("ngClass",H(10,pe,e.form==null?null:e.form.touched)),s(3),l("required",!0),s(2),l("required",!0),s(5),l("loading",e.loading))},dependencies:[G,k,_,b,y,I,N,F,E,M,q,P]});let n=i;return n})();var x=[{path:"",component:Z,data:{breadcrumb:"me"}},{path:"change-password",component:$,data:{breadcrumb:"change password"}}];var Ee=(()=>{let i=class i{};i.\u0275fac=function(o){return new(o||i)},i.\u0275mod=O({type:i}),i.\u0275inj=B({imports:[W.forChild(x)]});let n=i;return n})();export{Ee as MyAccountModule};
