import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-dao');

class UserDao {
  Schema = mongooseService.getMongoose().Schema;

  userSchema = new this.Schema(
    {
      fullname: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true, select: false },
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

  async getUserByEmail(email: string) {
    return await this.User.findOne({ email }).select('+password').exec();
  }

  async getUserById(userId: string) {
    return await this.User.findOne({ _id: userId }).exec();
  }
}

export default new UserDao();
