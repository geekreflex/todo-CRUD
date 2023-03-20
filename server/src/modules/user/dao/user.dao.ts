import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-dao');

class UserDao {
  Schema = mongooseService.getMongoose().Schema;

  userSchema = new this.Schema(
    {
      fullname: { type: String, required: true },
      email: { type: String, required: true, unique: true },
    },
    { timestamps: true }
  );

  User = mongooseService.getMongoose().model('Users', this.userSchema);

  constructor() {
    log('Created new instance of UserDao');
  }

  async createUser(userFields: any) {
    const user = new this.User({
      ...userFields,
    });
    await user.save();
    return user.id;
  }
}

export default new UserDao();
