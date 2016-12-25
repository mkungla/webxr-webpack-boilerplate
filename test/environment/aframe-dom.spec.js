import { plainHtmlDomSetUp, plainHtmlDomTeardown } from '../helpers/aframe-dom-setup';
import { before, after, describe, it } from 'mocha';
import { expect } from 'chai';

describe('Works with a-frame dom elements.', () => {

  before ( () => {
    plainHtmlDomSetUp('<!doctype html><html><body><a-scene id="my-scene"></a-scene></body></html>');
  });

  after(() => {
    plainHtmlDomTeardown();
  });

  it('Can create a-scene', () => {
    const sceneEl = document.querySelector('#my-scene');
    expect(sceneEl).to.not.be.null;
    expect(sceneEl.nodeName).eql('A-SCENE');
  });

  it('Can create a-assets', () => {
    const entity = document.createElement('a-assets');
    expect(entity.nodeName).eql('A-ASSETS');
  });

  it('Can create a-entity', () => {
    const entity = document.createElement('a-entity');
    expect(entity.nodeName).eql('A-ENTITY');
  });

  it('Can create a-mixin', () => {
    const entity = document.createElement('a-mixin');
    expect(entity.nodeName).eql('A-MIXIN');
  });

  it('Can render a-scene', () => {
    const entity = document.createElement("a-entity");
    const sceneEl = document.querySelector('#my-scene');
    sceneEl.appendChild(entity);

    const entities = document.querySelectorAll("a-entity");
    expect(document.body.innerHTML).not.to.be.empty;
    expect(entities.length).equal(1);
  });
});
