// API proxy for college data
// This allows the frontend to work standalone by proxying requests

const colleges = [
  { id: 1, name: "Indian Institute of Technology Bombay", city: "Mumbai", state: "Maharashtra", fees: 220000, rating: 4.8, course: "B.Tech", placement: 95, courses_offered: "Engineering, Science, Management", avg_salary: 1500000 },
  { id: 2, name: "Indian Institute of Technology Delhi", city: "New Delhi", state: "Delhi", fees: 210000, rating: 4.7, course: "B.Tech", placement: 94, courses_offered: "Engineering, Science, Management", avg_salary: 1400000 },
  { id: 3, name: "Indian Institute of Technology Madras", city: "Chennai", state: "Tamil Nadu", fees: 200000, rating: 4.6, course: "B.Tech", placement: 93, courses_offered: "Engineering, Science, Management", avg_salary: 1350000 },
  { id: 4, name: "Indian Institute of Technology Kanpur", city: "Kanpur", state: "Uttar Pradesh", fees: 190000, rating: 4.5, course: "B.Tech", placement: 92, courses_offered: "Engineering, Science, Management", avg_salary: 1300000 },
  { id: 5, name: "Indian Institute of Technology Kharagpur", city: "Kharagpur", state: "West Bengal", fees: 180000, rating: 4.4, course: "B.Tech", placement: 91, courses_offered: "Engineering, Science, Management", avg_salary: 1250000 },
  { id: 6, name: "National Institute of Technology Trichy", city: "Tiruchirappalli", state: "Tamil Nadu", fees: 150000, rating: 4.3, course: "B.Tech", placement: 90, courses_offered: "Engineering, Science", avg_salary: 800000 },
  { id: 7, name: "Birla Institute of Technology Mesra", city: "Ranchi", state: "Jharkhand", fees: 180000, rating: 4.2, course: "B.Tech", placement: 88, courses_offered: "Engineering, Science, Management", avg_salary: 750000 },
  { id: 8, name: "VIT University", city: "Vellore", state: "Tamil Nadu", fees: 170000, rating: 4.1, course: "B.Tech", placement: 87, courses_offered: "Engineering, Science, Management", avg_salary: 700000 },
  { id: 9, name: "Anna University", city: "Chennai", state: "Tamil Nadu", fees: 120000, rating: 4.0, course: "B.Tech", placement: 85, courses_offered: "Engineering, Science", avg_salary: 650000 },
  { id: 10, name: "Jadavpur University", city: "Kolkata", state: "West Bengal", fees: 100000, rating: 4.2, course: "B.Tech", placement: 86, courses_offered: "Engineering, Science, Arts", avg_salary: 700000 },
  { id: 11, name: "Delhi University", city: "New Delhi", state: "Delhi", fees: 50000, rating: 4.3, course: "BA", placement: 80, courses_offered: "Arts, Science, Commerce", avg_salary: 500000 },
  { id: 12, name: "Mumbai University", city: "Mumbai", state: "Maharashtra", fees: 60000, rating: 4.1, course: "BA", placement: 78, courses_offered: "Arts, Science, Commerce", avg_salary: 480000 },
  { id: 13, name: "Pune University", city: "Pune", state: "Maharashtra", fees: 80000, rating: 4.0, course: "B.Sc", placement: 82, courses_offered: "Arts, Science, Commerce", avg_salary: 520000 },
  { id: 14, name: "Bangalore University", city: "Bangalore", state: "Karnataka", fees: 55000, rating: 3.9, course: "BA", placement: 76, courses_offered: "Arts, Science, Commerce", avg_salary: 450000 },
  { id: 15, name: "Hyderabad University", city: "Hyderabad", state: "Telangana", fees: 45000, rating: 4.0, course: "BA", placement: 79, courses_offered: "Arts, Science, Commerce", avg_salary: 470000 },
  { id: 16, name: "Chandigarh University", city: "Chandigarh", state: "Punjab", fees: 160000, rating: 3.8, course: "B.Tech", placement: 84, courses_offered: "Engineering, Science, Management", avg_salary: 600000 },
  { id: 17, name: "Lovely Professional University", city: "Phagwara", state: "Punjab", fees: 140000, rating: 3.7, course: "B.Tech", placement: 83, courses_offered: "Engineering, Science, Management", avg_salary: 550000 },
  { id: 18, name: "Amrita Vishwa Vidyapeetham", city: "Coimbatore", state: "Tamil Nadu", fees: 190000, rating: 4.2, course: "B.Tech", placement: 89, courses_offered: "Engineering, Science, Management", avg_salary: 780000 },
  { id: 19, name: "SRM Institute of Science and Technology", city: "Chennai", state: "Tamil Nadu", fees: 175000, rating: 3.9, course: "B.Tech", placement: 85, courses_offered: "Engineering, Science, Management", avg_salary: 620000 },
];

export default function handler(req, res) {
  const { search, city, course, min_fees, max_fees, min_rating, page = 1, per_page = 12 } = req.query;
  
  let filtered = [...colleges];
  
  // Apply filters
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(s) || 
      c.city.toLowerCase().includes(s) ||
      c.course.toLowerCase().includes(s)
    );
  }
  
  if (city) {
    filtered = filtered.filter(c => c.city.toLowerCase().includes(city.toLowerCase()));
  }
  
  if (course) {
    filtered = filtered.filter(c => c.course.toLowerCase().includes(course.toLowerCase()));
  }
  
  if (min_fees) {
    filtered = filtered.filter(c => c.fees >= parseInt(min_fees));
  }
  
  if (max_fees) {
    filtered = filtered.filter(c => c.fees <= parseInt(max_fees));
  }
  
  if (min_rating) {
    filtered = filtered.filter(c => c.rating >= parseFloat(min_rating));
  }
  
  // Pagination
  const total = filtered.length;
  const totalPages = Math.ceil(total / per_page);
  const start = (page - 1) * per_page;
  const end = start + parseInt(per_page);
  const paginated = filtered.slice(start, end);
  
  res.status(200).json({
    colleges: paginated,
    pagination: {
      page: parseInt(page),
      per_page: parseInt(per_page),
      total,
      pages: totalPages
    }
  });
}