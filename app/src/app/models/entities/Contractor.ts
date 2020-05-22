import User from './User';
import {SpecialityEnum} from '../SpecialityEnum';
import {ShowcaseProject} from './ShowcaseProject';

export default class Contractor {
  id: string;
  userRef: User;
  speciality: SpecialityEnum[];
  showcaseProjects: ShowcaseProject[];
}
