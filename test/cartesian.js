import chai from 'chai';
import { isPointInPoly } from '../src/lib/pointsInPoly';

const expect = chai.expect;
const poly1 = [
  { longitude: 2, latitude: 3 },
  { longitude: 5, latitude: 6 },
  { longitude: 5, latitude: 4 },
  { longitude: 8, latitude: 4 },
  { longitude: 5, latitude: 1 }
];

describe('is point in poly1', () => {
  it('point not in poly1', () => {
    expect(isPointInPoly({ longitude: 0, latitude: 0 }, poly1)).to.equal(false);
    expect(isPointInPoly({ longitude: 2, latitude: 2 }, poly1)).to.equal(false);
    expect(isPointInPoly({ longitude: 3, latitude: 5 }, poly1)).to.equal(false);
    expect(isPointInPoly({ longitude: 5, latitude: 8 }, poly1)).to.equal(false);
    expect(isPointInPoly({ longitude: 6, latitude: 5 }, poly1)).to.equal(false);
    expect(isPointInPoly({ longitude: 7, latitude: 2 }, poly1)).to.equal(false);
    expect(isPointInPoly({ longitude: 5, latitude: -2 }, poly1)).to.equal(false);
  });
  it('point in poly1 - inside', () => {
    expect(isPointInPoly({ longitude: 4, latitude: 4 }, poly1)).to.equal(true);
    expect(isPointInPoly({ longitude: 5, latitude: 3 }, poly1)).to.equal(true);
    expect(isPointInPoly({ longitude: 4.5, latitude: 4.5 }, poly1)).to.equal(true);
  });
  it('point in poly1 - on edge or vertex', () => {
    expect(isPointInPoly({ longitude: 3, latitude: 4 }, poly1)).to.equal(true);
    expect(isPointInPoly({ longitude: 2, latitude: 3 }, poly1)).to.equal(true);
    expect(isPointInPoly({ longitude: 6, latitude: 4 }, poly1)).to.equal(true);
    expect(isPointInPoly({ longitude: 8, latitude: 4 }, poly1)).to.equal(true);
  });
});
