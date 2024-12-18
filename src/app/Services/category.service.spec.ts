import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CategoryDTO } from '../Models/category.dto';
import { CategoryService } from './category.service';

// mock lista de categorias
const categoriesList: CategoryDTO[] = [
  { userId: '', categoryId: '1', css_color: '', description: '', title: '' },
  { userId: '', categoryId: '2', css_color: '', description: '', title: '' },
  { userId: '', categoryId: '3', css_color: '', description: '', title: '' },
];

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  // instancias necesarias para cada test del servicio
  beforeEach(() => {
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // después de cada test
  afterEach(() => {
    httpMock.verify();
  });

  // TEST 1. el servicio debe crearse
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TEST 2. debe obtener categorías por ID de usuario
  it('should get categories by user ID', () => {
    service.getCategoriesByUserId('1').subscribe((categories) => {
      expect(categories.length).toBe(3);
      expect(categories).toEqual(categoriesList);
    });

    const req = httpMock.expectOne(
      'http://localhost:3000/users/categories/1'
    );
    expect(req.request.method).toBe('GET');
    req.flush(categoriesList);
  });

  // TEST 3. debe crear una categoría
  it('should create a category', () => {
    const newCategory: CategoryDTO = {
      userId: '',
      categoryId: '4',
      css_color: '',
      description: '',
      title: 'New Category',
    };

    service.createCategory(newCategory).subscribe((category) => {
      expect(category).toEqual(newCategory);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories');
    expect(req.request.method).toBe('POST');
    req.flush(newCategory);
  });

  // TEST 4. debe obtener una categoría por ID
  it('should get category by ID', () => {
    const category: CategoryDTO = {
      userId: '',
      categoryId: '1',
      css_color: '',
      description: '',
      title: 'Category 1',
    };

    service.getCategoryById('1').subscribe((cat) => {
      expect(cat).toEqual(category);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories/1');
    expect(req.request.method).toBe('GET');
    req.flush(category);
  });

  // TEST 5. debe actualizar una categoría
  it('should update a category', () => {
    const updatedCategory: CategoryDTO = {
      userId: '',
      categoryId: '1',
      css_color: '',
      description: '',
      title: 'Updated Category',
    };

    service.updateCategory('1', updatedCategory).subscribe((category) => {
      expect(category).toEqual(updatedCategory);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCategory);
  });

  // TEST 6. debe eliminar una categoría
  it('should delete a category', () => {
    const deleteResponse = { affected: 1 };

    service.deleteCategory('1').subscribe((response) => {
      expect(response).toEqual(deleteResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(deleteResponse);
  });
});
