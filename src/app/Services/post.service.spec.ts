import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostService } from './post.service';
import { SharedService } from './shared.service';
import { PostDTO } from '../Models/post.dto';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService, SharedService],
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  /**
   * Test 1: Verifica que el servicio se crea correctamente.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Test 2: Verifica que se obtienen todos los posts.
   */
  it('should get all posts', () => {
    const dummyPosts: PostDTO[] = [
      new PostDTO('Title 1', 'Description 1', 0, 0, new Date()),
      new PostDTO('Title 2', 'Description 2', 0, 0, new Date()),
    ];

    service.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  /**
   * Test 3: Verifica que se obtienen los posts por ID de usuario.
   */
  it('should get posts by user ID', () => {
    const dummyPosts: PostDTO[] = [
      new PostDTO('Title 1', 'Description 1', 0, 0, new Date()),
      new PostDTO('Title 2', 'Description 2', 0, 0, new Date()),
    ];

    service.getPostsByUserId('1').subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne('http://localhost:3000/users/posts/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  /**
   * Test 4: Verifica que se puede crear un post.
   */
  it('should create a post', () => {
    const newPost: PostDTO = new PostDTO(
      'Title 3',
      'Description 3',
      0,
      0,
      new Date()
    );

    service.createPost(newPost).subscribe((post) => {
      expect(post).toEqual(newPost);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toBe('POST');
    req.flush(newPost);
  });

  /**
   * Test 5: Verifica que se puede obtener un post por ID.
   */
  it('should get post by ID', () => {
    const post: PostDTO = new PostDTO(
      'Title 1',
      'Description 1',
      0,
      0,
      new Date()
    );

    service.getPostById('1').subscribe((p) => {
      expect(p).toEqual(post);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');
    expect(req.request.method).toBe('GET');
    req.flush(post);
  });

  /**
   * Test 6: Verifica que se puede actualizar un post.
   */
  it('should update a post', () => {
    const updatedPost: PostDTO = new PostDTO(
      'Updated Title',
      'Updated Description',
      0,
      0,
      new Date()
    );

    service.updatePost('1', updatedPost).subscribe((post) => {
      expect(post).toEqual(updatedPost);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPost);
  });

  /**
   * Test 7: Verifica que se puede dar like a un post.
   */
  it('should like a post', () => {
    const updateResponse = { affected: 1 };

    service.likePost('1').subscribe((response) => {
      expect(response).toEqual(updateResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/like/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updateResponse);
  });

  /**
   * Test 8: Verifica que se puede dar dislike a un post.
   */
  it('should dislike a post', () => {
    const updateResponse = { affected: 1 };

    service.dislikePost('1').subscribe((response) => {
      expect(response).toEqual(updateResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/dislike/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updateResponse);
  });

  /**
   * Test 9: Verifica que se puede eliminar un post.
   */
  it('should delete a post', () => {
    const deleteResponse = { affected: 1 };

    service.deletePost('1').subscribe((response) => {
      expect(response).toEqual(deleteResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(deleteResponse);
  });
});
