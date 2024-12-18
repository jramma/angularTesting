import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { HeaderMenusService } from "src/app/Services/header-menus.service";
import { HeaderComponent } from "./header.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let spy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Router, useClass: Router },
        { provide: HeaderMenusService, useClass: HeaderMenusService },
        { provide: LocalStorageService, useClass: LocalStorageService },
      ],
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spy = spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
  });

  // Test 1, que se cree el componente correctamente
  it('HEADER COMPONENT should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2, que el método navigationTo funcione correctamente
  it('HEADER COMPONENT navigationTo should work', () => {
    component.navigationTo('home');
    expect(spy).toHaveBeenCalledWith('home');
  });

  // Test 3, que navegue a home
  it('HEADER COMPONENT should navigate to home', () => {
    component.navigationTo('home');
    expect(spy).toHaveBeenCalledWith('home');
  });

  // Test 4, que navegue a login
  it('HEADER COMPONENT should navigate to login', () => {
    component.navigationTo('login');
    expect(spy).toHaveBeenCalledWith('login');
  });

  // Test 5, que navegue a register
  it('HEADER COMPONENT should navigate to register', () => {
    component.navigationTo('register');
    expect(spy).toHaveBeenCalledWith('register');
  });

  // Test 6, que navegue a adminPosts
  it('HEADER COMPONENT should navigate to adminPosts', () => {
    component.navigationTo('adminPosts');
    expect(spy).toHaveBeenCalledWith('adminPosts');
  });

  // Test 7, que navegue a adminCategories
  it('HEADER COMPONENT should navigate to adminCategories', () => {
    component.navigationTo('adminCategories');
    expect(spy).toHaveBeenCalledWith('adminCategories');
  });

  // Test 8, que navegue a profile
  it('HEADER COMPONENT should navigate to profile', () => {
    component.navigationTo('profile');
    expect(spy).toHaveBeenCalledWith('profile');
  });
});
