import { faker } from '@faker-js/faker';
export class TodoBuilder {

 addTitle() {
 this.title = faker.lorem.words(3);
 return this;
 }

 addDescription() {
 this.description = faker.lorem.sentence();
 return this;
 }

 addDoneStatus(status = false) {
 this.doneStatus = status;
 return this;
 }

 withTitleExceedingMaxLength() {
    this.title = 'a'.repeat(51);
    return this;
  }

 generate() { return { ... this }; }
}