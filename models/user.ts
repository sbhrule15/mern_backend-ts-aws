import { Document, Model, model, Types, Schema, Query } from "mongoose"
import mongoosePaginate from 'mongoose-paginate';
import bcrypt from 'bcryptjs';

// Model Imports
/** import { Company } from "./Company" */

//----------------INTERFACES-----------------//
export interface User extends Document {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateCreated: Date;
  dateLastUpdated: Date;
}

// INSTANCE METHODS - DON'T EXPORT
interface UserBaseDocument extends User, Document {
  comparePassword(): void;
}

// FOR REFERENCING OTHER DOCUMENTS
export interface UserPopulatedDocument extends UserBaseDocument {
  /** company: Company; */
}

// FOR REFERENCING OTHER DOCUMENTS BY ID
export interface UserDocument extends UserBaseDocument {
  /** company: Company["_id"]; */
}

// FOR MODEL
export interface UserModel extends Model<UserDocument> {
  /** findMyCompany(id: string): Promise<UserPopulatedDocument> */
}

//----------------MODEL-----------------//
const UserSchema = new Schema<UserDocument, UserModel>({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  firstName: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateLastUpdated: {
    type: Date,
    default: Date.now
  },
  // company: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Company",
  //   required: true
  // },
});

//----------------AUTHENTICATION------------------//

// Encrypt and store password
UserSchema.pre<User>('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    bcrypt.genSalt(10, (err: Error, salt: string) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (hashErr, hash) => {
        if (hashErr) return next(hashErr);  
        user.password = hash;
        next();
      });
    });
  });

// Confirm password against stored password
UserSchema.methods.comparePassword = function(this: UserBaseDocument, password: string, done: any) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

//----------------OTHER METHODS------------------//
// Paginate the results
UserSchema.plugin(mongoosePaginate);

//----------------VIRTUALS------------------//
UserSchema.virtual("fullName").get(function(this: UserBaseDocument) {
  return this.firstName + this.lastName
})

//----------------EXPORTS------------------//
export default model<User>('User', UserSchema);