// // Import `create` from Zustand to create a global state management store
// import { create } from 'zustand'; 

// /** 
//  * Defines the structure of a conversation. 
//  * Each conversation will have:
//  * - `id`: A unique identifier for the conversation
//  * - `fullName`: The full name of the other participant in the conversation
//  * - `profilePic`: A URL or path to the user's profile picture 
//  */
// export type ConversationType = {
//     id: string;
//     fullName: string;
//     profilePic: string;
// };

// /** 
//  * Defines the structure of a message in the conversation. 
//  * Each message will have:
//  * - `id`: A unique identifier for the message
//  * - `body`: The text content of the message
//  * - `senderId`: The ID of the user who sent the message 
//  */
// type MessageType = {
//     id: string;
//     body: string;
//     senderId: string;
// };

// /** 
//  * Defines the structure of the global conversation state in Zustand. 
//  * This state will manage:
//  * - `selectedConversation`: Stores the currently selected conversation (or `null` if no conversation is selected)
//  * - `messages`: An array of messages belonging to the selected conversation
//  * - `setSelectedConversation`: A function that updates `selectedConversation`
//  * - `setMessages`: A function that updates the `messages` array 
//  */
// interface ConversationState {
//     selectedConversation: ConversationType | null; // Initially, no conversation is selected
//     messages: MessageType[]; // Initially, there are no messages

//     /** 
//      * Function to update the selected conversation.
//      * Takes a `ConversationType` object or `null` and updates the state.
//      */
//     setSelectedConversation: (conversation: ConversationType | null) => void;

//     /** 
//      * Function to update the messages array.
//      * Takes an array of `MessageType` objects and updates the state.
//      */
//     setMessages: (messages: MessageType[]) => void;
// }

// /** 
//  * Zustand store for managing conversations and messages.
//  * This store provides a globally accessible state for chat functionality.
//  */
// const useConversation = create<ConversationState>((set) => ({
//     /** 
//      * `selectedConversation` is initially set to `null`, meaning no chat is open.
//      * When a user selects a conversation, this value will be updated.
//      */
//     selectedConversation: null,

//     /** 
//      * Function to update the selected conversation.
//      * Calls `set` to update the Zustand state.
//      */
//     setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),

//     /** 
//      * `messages` is initially an empty array, meaning there are no messages.
//      * When a conversation is selected, messages will be loaded into this state.
//      */
//     messages: [],

//     /** 
//      * Function to update the `messages` array.
//      * Calls `set` to update the Zustand state with new messages.
//      */
//     setMessages: (messages) => set({ messages: messages }),
// }));

// // Export the Zustand hook so it can be used in components
// export default useConversation;



// // Imagine You Are Using WhatsApp
// // Think of this Zustand store as a mini version of WhatsApp’s chat system.

// // 1️⃣ You Open WhatsApp

// // But no chat is selected yet.

// // selectedConversation = null

// // 2️⃣ You Click on a Chat

// // Now you have selected a conversation.

// // setSelectedConversation(conversation) updates the Zustand state with that chat.

// // 3️⃣ You See Old Messages in the Chat

// // WhatsApp loads the previous messages of that chat.

// // setMessages(messages) updates the message list.

// // 4️⃣ You Send a Message

// // The new message gets added to the chat.

// // setMessages([...messages, newMessage]) updates the state.

// // 5️⃣ You Click Another Chat

// // The selected chat changes, and a new set of messages loads.

// // setSelectedConversation(newChat) updates the selected chat.

// // setMessages(newMessages) updates the messages.


// // What Problem Does Zustand Solve?
// // Imagine you have multiple components in your app:
// // ✅ Sidebar → Shows chat list
// // ✅ Chat Window → Shows messages of the selected chat
// // ✅ Input Box → Sends messages

// // ❌ If you use useState, you must pass data between components manually (prop drilling).
// // ✅ With Zustand, every component can access the same state without passing props!


import { create } from "zustand";

// export type ConversationType = {
// 	id: string;
// 	fullName: string;
// 	profilePic: string;
// };

export type MessageType = {
	id: string;
	body: string;
	senderId: string;
	createdAt: string;
	shouldShake?: boolean;
};

interface ConversationState {
	selectedConversation: ConversationType | null;
	messages: MessageType[];
	setSelectedConversation: (conversation: ConversationType | null) => void;
	setMessages: (messages: MessageType[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
	selectedConversation: null,
	setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
	messages: [],
	setMessages: (messages) => set({ messages: messages }),
}));

export default useConversation;

// JS VERSION
// import { create } from "zustand";

// const useConversation = create((set) => ({
// 	selectedConversation: null,
// 	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
// 	messages: [],
// 	setMessages: (messages) => set({ messages }),
// }));

// export default useConversation;