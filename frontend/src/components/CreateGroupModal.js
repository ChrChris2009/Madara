import React, { useState } from 'react';
import './CreateGroupModal.css';

const CreateGroupModal = ({ onClose, onGroupCreated, currentUser }) => {
    const [groupName, setGroupName] = useState('');
    // Simulation d'une liste d'amis disponibles pour le groupe
    const [availableUsers] = useState([
        { id: 'user_celestin', username: 'Celestin' },
        { id: 'user_cassidy', username: 'Cassidy' }
    ]);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const toggleMember = (userId) => {
        if (selectedMembers.includes(userId)) {
            setSelectedMembers(selectedMembers.filter(id => id !== userId));
        } else {
            setSelectedMembers([...selectedMembers, userId]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!groupName.trim()) return;

        try {
            const response = await fetch('http://localhost:5000/api/groups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: groupName,
                    members: selectedMembers,
                    creatorId: currentUser.id
                })
            });
            const data = await response.json();
            if (response.ok) {
                onGroupCreated(data);
                onClose();
            }
        } catch (err) {
            console.error("Erreur création groupe:", err);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-card active-glow">
                <h3>Créer un groupe</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Nom du groupe..." 
                        value={groupName} 
                        onChange={(e) => setGroupName(e.target.value)} 
                        required 
                    />
                    <div className="members-selection">
                        <p>Sélectionner les membres :</p>
                        {availableUsers.map(user => (
                            <label key={user.id} className="member-checkbox">
                                <input 
                                    type="checkbox" 
                                    checked={selectedMembers.includes(user.id)} 
                                    onChange={() => toggleMember(user.id)} 
                                />
                                {user.username}
                            </label>
                        ))}
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>Annuler</button>
                        <button type="submit" className="submit-btn">Créer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateGroupModal;

