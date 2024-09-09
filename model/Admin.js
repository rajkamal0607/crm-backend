const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const AdminSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: String,
    designation: String
},{timestamps: { createdAt: 'created', updatedAt: 'modified' }})

AdminSchema.pre('save', async function (next) {
    // Hash the password before saving the admin model
    const admin = this
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
})

AdminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({email: email});
    if (!admin) {
        throw { message: 'login error' }
    }
    const isPasswordMatch = await bcrypt.compare(password, admin.password)
    if (!isPasswordMatch) {
        throw { message: 'login error' }
    }
    return admin
}

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin