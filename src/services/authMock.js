export async function login(code, password) {
  const API_URL = "/data/all_students.json";

  // 1. Simulate backend delay
  await new Promise(res => setTimeout(res, 500));

  // 2. Fetch the student list
  const res = await fetch(API_URL);

  const data = await res.json();
  const students = data;

  // 3. Find the user
  const user = students.find(
    s => s.code === code && s.password === password
  );

  // 4. If no match → return error response
  if (!user) {
    return {
      success: false,
      message: "Invalid code or password"
    };
  }

  // 5. If success → return mock response
  return {
    success: true,
    data: {
      token: "mock-jwt-token-123",
      user: {
        id: user.id,
        code: user.code,
        role_en: user.role_en,
        role_ar: user.role_ar,
        name_en: user.name_en,
        name_ar: user.name_ar,
        email: user.email,
        phone: user.phone,
        address_en: user.address_en,
        address_ar: user.address_ar,
        department_en: user.department_en,
        department_ar: user.department_ar,
        image: user.image,
        gpa: user.gpa,
        year: user.year,
        semester: user.semester,
        stats: {
          attendance_percentage: user.stats.attendance_percentage,
          fees_total: user.stats.fees_total,
          fees_paid: user.stats.fees_paid
        }
      }
    },
  };
}
