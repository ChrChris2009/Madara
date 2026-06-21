import React from 'react';
import './EmojiPicker.css';

const EmojiPicker = ({ onSelectEmoji }) => {
    const emojis = ['😀', '😂', '🔥', '👍', '❤️', '🎉', '🚀', '👀', '✨', '💯', '🤔', '💬'];

    return (
        <div className="emoji-picker-container active-glow">
            {emojis.map((emoji, index) => (
                <span 
                    key={index} 
                    className="emoji-item" 
                    onClick={() => onSelectEmoji(emoji)}
                >
                    {emoji}
                </span>
            ))}
        </div>
    );
};

export default EmojiPicker;

