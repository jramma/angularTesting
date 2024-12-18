import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PostDTO } from 'src/app/Models/post.dto';
import { PostService } from 'src/app/Services/post.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';
import { PostsListComponent } from './posts-list.component';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: jasmine.SpyObj<Router>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPostsByUserId', 'deletePost']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [PostsListComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        SharedService
      ]
    }).compileComponents();

    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test 1: Verifica que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Verifica que se llama a getPostsByUserId y la respuesta es la esperada.
  it('should call getPostsByUserId and return expected posts', () => {
    const dummyPosts: PostDTO[] = [
      new PostDTO('Title 1', 'Description 1', 0, 0, new Date()),
      new PostDTO('Title 2', 'Description 2', 0, 0, new Date())
    ];

    localStorageService.get.and.returnValue('123');
    postService.getPostsByUserId.and.returnValue(of(dummyPosts));

    component['loadPosts']();

    expect(postService.getPostsByUserId).toHaveBeenCalledWith('123');
    expect(component.posts).toEqual(dummyPosts);
  });

  // Test 3: Verifica que se llama a navigateByUrl con el argumento correcto al crear un post.
  it('should navigate to the correct URL when creating a post', () => {
    component.createPost();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/user/post/');
  });

  // Test 4: Verifica que se llama a navigateByUrl con el argumento correcto al actualizar un post.
  it('should navigate to the correct URL when updating a post', () => {
    const postId = '1';
    component.updatePost(postId);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/user/post/' + postId);
  });
});
