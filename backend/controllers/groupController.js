const Group = require('../models/Group');

exports.createGroup = async (req, res) => {
    try {
        const { name, members, creatorId } = req.body;
        // Le créateur fait automatiquement partie des membres
        const allMembers = [...new Set([...members, creatorId])];
        
        const newGroup = new Group({
            name,
            members: allMembers,
            createdBy: creatorId
        });
        
        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ message: "Erreur création groupe", error: error.message });
    }
};

exports.getUserGroups = async (req, res) => {
    try {
        const { userId } = req.params;
        const groups = await Group.find({ members: userId });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: "Erreur récupération groupes", error: error.message });
    }
};

