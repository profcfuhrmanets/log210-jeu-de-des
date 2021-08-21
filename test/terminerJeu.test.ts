import supertest from 'supertest';
import 'jest-extended';
import app from '../src/App';

const request = supertest(app);

let testNom1 = 'Jean-Marc';
let testNom2 = 'Pierre';

beforeAll(async () => {
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom1 });
});

describe('GET /api/v1/jeu/terminerJeu/:id', () => {
    it('responds with successful call', async () => {
        const response = await request.get('/api/v1/jeu/terminerJeu/' + testNom1);
        let resultat = JSON.parse(response.body.resultat);
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(resultat.nom).toBe(testNom1);
    });

    it('responds with bad request when player does not exist', async () => {
        const response = await request.get('/api/v1/jeu/terminerJeu/' + testNom1);

        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body.error).toInclude("n'existe pas");
        expect(response.body.error).toInclude(testNom1);
    });
});