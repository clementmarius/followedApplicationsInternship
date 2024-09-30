const prisma = require('../libs/prisma');
const bcrypt = require('bcrypt');
const { sendEmail: brevoSendEmail } = require('../brevo');
const { email } = require('../config');
