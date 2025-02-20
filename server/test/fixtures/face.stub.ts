import { AssetFaceEntity } from '@app/infra/entities';
import { assetStub } from './asset.stub';
import { personStub } from './person.stub';

export const faceStub = {
  face1: Object.freeze<AssetFaceEntity>({
    assetId: assetStub.image.id,
    asset: assetStub.image,
    personId: personStub.withName.id,
    person: personStub.withName,
    embedding: [1, 2, 3, 4],
    boundingBoxX1: 0,
    boundingBoxY1: 0,
    boundingBoxX2: 1,
    boundingBoxY2: 1,
    imageHeight: 1024,
    imageWidth: 1024,
  }),
  primaryFace1: Object.freeze<AssetFaceEntity>({
    assetId: assetStub.image.id,
    asset: assetStub.image,
    personId: personStub.primaryPerson.id,
    person: personStub.primaryPerson,
    embedding: [1, 2, 3, 4],
    boundingBoxX1: 0,
    boundingBoxY1: 0,
    boundingBoxX2: 1,
    boundingBoxY2: 1,
    imageHeight: 1024,
    imageWidth: 1024,
  }),
  mergeFace1: Object.freeze<AssetFaceEntity>({
    assetId: assetStub.image.id,
    asset: assetStub.image,
    personId: personStub.mergePerson.id,
    person: personStub.mergePerson,
    embedding: [1, 2, 3, 4],
    boundingBoxX1: 0,
    boundingBoxY1: 0,
    boundingBoxX2: 1,
    boundingBoxY2: 1,
    imageHeight: 1024,
    imageWidth: 1024,
  }),
  mergeFace2: Object.freeze<AssetFaceEntity>({
    assetId: assetStub.image1.id,
    asset: assetStub.image1,
    personId: personStub.mergePerson.id,
    person: personStub.mergePerson,
    embedding: [1, 2, 3, 4],
    boundingBoxX1: 0,
    boundingBoxY1: 0,
    boundingBoxX2: 1,
    boundingBoxY2: 1,
    imageHeight: 1024,
    imageWidth: 1024,
  }),
  start: Object.freeze<AssetFaceEntity>({
    assetId: assetStub.image.id,
    asset: assetStub.image,
    personId: personStub.newThumbnail.id,
    person: personStub.newThumbnail,
    embedding: [1, 2, 3, 4],
    boundingBoxX1: 5,
    boundingBoxY1: 5,
    boundingBoxX2: 505,
    boundingBoxY2: 505,
    imageHeight: 1000,
    imageWidth: 1000,
  }),
  middle: Object.freeze<AssetFaceEntity>({
    assetId: assetStub.image.id,
    asset: assetStub.image,
    personId: personStub.newThumbnail.id,
    person: personStub.newThumbnail,
    embedding: [1, 2, 3, 4],
    boundingBoxX1: 100,
    boundingBoxY1: 100,
    boundingBoxX2: 200,
    boundingBoxY2: 200,
    imageHeight: 500,
    imageWidth: 400,
  }),
  end: Object.freeze<AssetFaceEntity>({
    assetId: assetStub.image.id,
    asset: assetStub.image,
    personId: personStub.newThumbnail.id,
    person: personStub.newThumbnail,
    embedding: [1, 2, 3, 4],
    boundingBoxX1: 300,
    boundingBoxY1: 300,
    boundingBoxX2: 495,
    boundingBoxY2: 495,
    imageHeight: 500,
    imageWidth: 500,
  }),
};
