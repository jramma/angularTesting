import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { CategoryService, deleteResponse } from 'src/app/Services/category.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';
import { CategoriesListComponent } from './categories-list.component';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;
  let categoryService: jasmine.SpyObj<CategoryService>;
  let router: jasmine.SpyObj<Router>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(async () => {
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', [
      'getCategoriesByUserId',
      'deleteCategory',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'get',
    ]);

    await TestBed.configureTestingModule({
      declarations: [CategoriesListComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        SharedService,
      ],
    }).compileComponents();

    categoryService = TestBed.inject(
      CategoryService
    ) as jasmine.SpyObj<CategoryService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    localStorageService = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test 1: Verifica que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Verifica que se llama a getCategoriesByUserId y la respuesta es la esperada.
  it('should call getCategoriesByUserId and return expected categories', () => {
    const dummyCategories: CategoryDTO[] = [
      {
        userId: '',
        categoryId: '1',
        css_color: '',
        description: '',
        title: '',
      },
      {
        userId: '',
        categoryId: '2',
        css_color: '',
        description: '',
        title: '',
      },
    ];

    localStorageService.get.and.returnValue('1');
    categoryService.getCategoriesByUserId.and.returnValue(of(dummyCategories));

    component['loadCategories']();

    expect(categoryService.getCategoriesByUserId).toHaveBeenCalledWith('1');
    expect(component.categories).toEqual(dummyCategories);
  });

  // Test 3: Verifica que se llama a navigateByUrl con el argumento correcto al crear una categoría.
  it('should navigate to the correct URL when creating a category', () => {
    component.createCategory();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/user/category/');
  });

  // Test 4: Verifica que se llama a navigateByUrl con el argumento correcto al actualizar una categoría.
  it('should navigate to the correct URL when updating a category', () => {
    const categoryId = '1';
    component.updateCategory(categoryId);
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      '/user/category/' + categoryId
    );
  });

  /**
   * Test 5: Verifica que se llama a deleteCategory y se recargan las categorías.
   * - Simula la confirmación del usuario para eliminar una categoría.
   * - Verifica que se llama al método deleteCategory del servicio con el ID correcto.
   * - Verifica que las categorías se actualizan después de la eliminación.
   */
  it('should call deleteCategory and reload categories', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteResponse: deleteResponse = { affected: 1 };
    const dummyCategories: CategoryDTO[] = [
      {
        userId: '',
        categoryId: '1',
        css_color: '',
        description: '',
        title: '',
      },
      {
        userId: '',
        categoryId: '2',
        css_color: '',
        description: '',
        title: '',
      },
    ];
    categoryService.deleteCategory.and.returnValue(of(deleteResponse));
    categoryService.getCategoriesByUserId.and.returnValue(of(dummyCategories));
    localStorageService.get.and.returnValue('1');

    component.deleteCategory('1');

    expect(categoryService.deleteCategory).toHaveBeenCalledWith('1');
    expect(categoryService.getCategoriesByUserId).toHaveBeenCalledWith('1');
    expect(component.categories).toEqual(dummyCategories);
  });
});
