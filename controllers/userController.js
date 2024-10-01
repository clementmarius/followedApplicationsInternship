const userService = require('../services/userService');

async function createUser(req, res) {
    const { email, password, profile } = req.body;

    try {
        const newUser = await userService.createUserProfile(
            { email, password },
            profile
        );

        console.log('User created successfully:');
        console.log(`User ID: ${newUser.id}`);
        console.log(`Email: ${newUser.email}`);
        if (newUser.profile) {
            console.log('Profile created:');
            console.log(`Profile ID: ${newUser.profile.id}`);
            console.log(`First Name: ${newUser.profile.firstName}`);
            console.log(`Last Name: ${newUser.profile.lastName}`);
        }

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function findUserById(req, res) {
    const userId = parseInt(req.params.id);

    try {
        const userProfile = await userService.getUserWithId(userId);
        res.status(201).json(userProfile);
        console.log('User by ID:', userProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function findAllUserById(req, res) {
    const usersById = parseInt(req.params.id);

    try {
        const usersId = await userService.getAllUserId(usersById);
        res.status(201).json(usersById);
        console.log('Users Id :', usersId);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


module.exports = {
    createUser,
    findUserById,
    findAllUserById,
};