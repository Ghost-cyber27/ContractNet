export const connectChatSocket = (
  token: string,
  onMessage: (data: any) => void
) => {
  const ws = new WebSocket(`ws://192.168.210.82:8000/ws/?token=${token}`);

  ws.onopen = () => {
    console.log("✅ Connected to WebSocket");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  ws.onerror = (e) => console.log("WebSocket error", e);
  ws.onclose = () => console.log("❌ Disconnected from WebSocket");

  return ws;
};
