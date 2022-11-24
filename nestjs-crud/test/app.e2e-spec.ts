import {
    INestApplication,
    ValidationPipe,
} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import * as pactum from 'pactum';
import {AppModule} from '../src/app.module';
import {EditUserDto} from '../src/user/dto';
import {PrismaService} from "../src/prisma/prisma.service";

describe('App e2e', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    beforeAll(async () => {
        const moduleRef =
            await Test.createTestingModule({
                imports: [AppModule],
            }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            }),
        );
        await app.init();
        await app.listen(5002);
        prisma = app.get(PrismaService);
        await prisma.cleanDb();
        pactum.request.setBaseUrl(
            'http://localhost:5002',
        );
    });

    afterAll(() => {
        app.close();
    });

    describe('Auth', () => {
        const user = {
            email: 'memet@memet.com',
            password: '123456',
        }
        describe('Register', () => {
            it('should throw if email empty', () => {
                return pactum
                    .spec()
                    .post('/auth/register')
                    .withBody({
                        email: '',
                        password: user.password,
                    })
                    .expectStatus(400);
            });
            it('should throw if password empty', () => {
                return pactum
                    .spec()
                    .post('/auth/register')
                    .withBody({
                        email: user.email,
                    })
                    .expectStatus(400);
            });
            it('should throw if no body provided', () => {
                return pactum
                    .spec()
                    .post('/auth/register')
                    .expectStatus(400);
            });
            it('should signup', () => {
                return pactum
                    .spec()
                    .post('/auth/register')
                    .withBody(user)
                    .expectStatus(201)
                    .stores('token', 'token');
            });
        });

        describe('Login', () => {
            it('should throw if email empty', () => {
                return pactum
                    .spec()
                    .post('/auth/login')
                    .withBody({
                        password: user.password,
                    })
                    .expectStatus(400);
            });
            it('should throw if password empty', () => {
                return pactum
                    .spec()
                    .post('/auth/login')
                    .withBody({
                        email: user.email,
                    })
                    .expectStatus(400);
            });
            it('should throw if no body provided', () => {
                return pactum
                    .spec()
                    .post('/auth/login')
                    .expectStatus(400);
            });
            it('should signin', () => {
                return pactum
                    .spec()
                    .post('/auth/login')
                    .withBody(user)
                    .expectStatus(200)
                    .stores('token', 'token');
            });
        });
    });

    describe('User', () => {
        describe('Get me', () => {
            it('should get current user', () => {
                return pactum
                    .spec()
                    .get('/user/me')
                    .withHeaders({
                        Authorization: 'Bearer $S{token}',
                    })
                    .expectStatus(200);
            });
        });

        describe('Edit user', () => {
            it('should edit user', () => {
                const dto: EditUserDto = {
                    firstName: 'Memet',
                    email: 'memet2@memet.com',
                };
                return pactum
                    .spec()
                    .put('/user')
                    .withHeaders({
                        Authorization: 'Bearer $S{token}',
                    })
                    .withBody(dto)
                    .expectStatus(200)
                    .expectBodyContains(dto.firstName)
                    .expectBodyContains(dto.email);
            });
        });
    });

    describe('Bookmarks', () => {
        describe('Get empty bookmarks', () => {
            it('should get bookmarks', () => {
                return pactum
                    .spec()
                    .get('/bookmark')
                    .withHeaders({
                        Authorization: 'Bearer $S{token}',
                    })
                    .expectStatus(200)
                    .expectBody([]);
            });
        });

        describe('Create bookmark', () => {
            const bookmark = {
                title: 'First Bookmark',
                url: 'https://exortek.medium.com',
            };
            it('should create bookmark', () => {
                return pactum
                    .spec()
                    .post('/bookmark')
                    .withHeaders({
                        Authorization: 'Bearer $S{token}',
                    })
                    .withBody(bookmark)
                    .expectStatus(201)
                    .stores('bookmarkId', 'id');
            });
        });

        describe('Get bookmarks', () => {
            it('should get bookmarks', () => {
                return pactum
                    .spec()
                    .get('/bookmark')
                    .withHeaders({
                        Authorization: 'Bearer $S{token}',
                    })
                    .expectStatus(200)
                    .expectJsonLength(1);
            });
        });

        describe('Get bookmark by id', () => {
            it('should get bookmark by id', () => {
                return pactum
                    .spec()
                    .get('/bookmark/{id}')
                    .withPathParams('id', '$S{bookmarkId}')
                    .withHeaders({
                        Authorization: 'Bearer $S{token}',
                    })
                    .expectStatus(200)
                    .expectBodyContains('$S{bookmarkId}');
            });
        });

        describe('Edit bookmark by id', () => {
            const editBookmark = {
                title:
                    'Kubernetes Course - Full Beginners Tutorial (Containerize Your Apps!)',
                description:
                    'Learn how to use Kubernetes in this complete course. Kubernetes makes it possible to containerize applications and simplifies app deployment to production.',
            };
            it('should edit bookmark', () => {
                return pactum
                    .spec()
                    .put('/bookmark/{id}')
                    .withPathParams('id', '$S{bookmarkId}')
                    .withHeaders({
                        Authorization: 'Bearer $S{token}',
                    })
                    .withBody(editBookmark)
                    .expectStatus(200)
                    .expectBodyContains(editBookmark.title)
                    .expectBodyContains(editBookmark.description);
            });
        });

        describe('Delete bookmark by id', () => {
            it('should delete bookmark', () => {
                return pactum
                    .spec()
                    .delete('/bookmark/{id}')
                    .withPathParams('id', '$S{bookmarkId}')
                    .withHeaders({
                        Authorization: 'Bearer $S{token}',
                    })
                    .expectStatus(200);
            });

            it('should get empty bookmarks', () => {
                return pactum
                    .spec()
                    .get('/bookmark')
                    .withHeaders({
                        Authorization: 'Bearer $S{token}',
                    })
                    .expectStatus(200)
                    .expectJsonLength(0);
            });
        });
    });
});