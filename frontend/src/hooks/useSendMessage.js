// // Create a new file: hooks/useSendMessage.js

// import { useSocketContext } from "../context/SocketContext";


// import useConversation from "../zustand/useConversation";

// const useSendMessage = () => {
//   const { socket } = useSocketContext();
//   const { selectedConversation } = useConversation();
  
//   const sendMessageSocket = (message) => {
//     if (socket && selectedConversation) {
//       socket.emit("sendMessage", {
//         ...message,
//         receiverId: selectedConversation._id || selectedConversation.id
//       });
//     }
//   };
  
//   return { sendMessageSocket };
// };

// export default useSendMessage;

// hooks/useSendMessage.js
import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const { socket } = useSocketContext();

	const sendMessage = async (message) => {
		if (!selectedConversation) return;
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation.id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
			
			// Add this block to emit the message via socket
			if (socket) {
				socket.emit("sendMessage", {
					...data,
					receiverId: selectedConversation.id
				});
			}
			
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;