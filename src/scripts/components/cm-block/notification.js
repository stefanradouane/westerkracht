import React from 'react';

export const Notification = (state) => {
    switch (state) {
        case "error":

            return "error";
    
        default:

            return "done";
    }
}