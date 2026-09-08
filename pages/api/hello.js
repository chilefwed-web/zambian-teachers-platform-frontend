export default function handler(req, res) {
  res.status(200).json({ 
    message: '???? Zambian Teachers Platform API is ready!',
    version: '1.0.0'
  });
}