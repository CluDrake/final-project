import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  await prisma.$queryRaw`TRUNCATE "Loan", "Book", "Category", "users" RESTART IDENTITY CASCADE;`;

  // ── 1. Users ──────────────────────────────────────────────
  const usersData = [
    { name: 'Admin User',     email: 'admin@library.com',  password: 'Password123!', role: 'admin'  },
    { name: 'Regular Member', email: 'member@library.com', password: 'Password123!', role: 'member' },
    { name: 'Librarian User', email: 'librarian@library.com', password: 'Password123!', role: 'librarian' },
  ];

  const users = [];

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        name:     userData.name,
        email:    userData.email,
        password: hashedPassword,
        role:     userData.role,
      },
    });

    users.push(user);
  }

  // ── 2. Categories ─────────────────────────────────────────
  const categoriesData = [
    { name: 'Fiction'     },
    { name: 'Non-Fiction' },
    { name: 'Science'     },
  ];

  const categories = await prisma.$transaction(
    categoriesData.map((c) => prisma.category.create({ data: c }))
  );

  // ── 3. Books ──────────────────────────────────────────────
  const [fiction, nonFiction, science] = categories;

  const booksData = [
    {
      title:       'The Great Gatsby',
      author:      'F. Scott Fitzgerald',
      isbn:        '978-0-7432-7356-5',
      isAvailable: true,
      categoryId:  fiction.id,
    },
    {
      title:       'To Kill a Mockingbird',
      author:      'Harper Lee',
      isbn:        '978-0-06-112008-4',
      isAvailable: false, // currently on loan
      categoryId:  fiction.id,
    },
    {
      title:       'A Brief History of Time',
      author:      'Stephen Hawking',
      isbn:        '978-0-393-31568-8',
      isAvailable: true,
      categoryId:  science.id,
    },
    {
      title:       'Sapiens',
      author:      'Yuval Noah Harari',
      isbn:        '978-1-5011-1360-3',
      isAvailable: true,
      categoryId:  nonFiction.id,
    },
  ];

  const books = await prisma.$transaction(
    booksData.map((b) => prisma.book.create({ data: b }))
  );

  // ── 4. Loans ──────────────────────────────────────────────
  const [admin, member] = users;
  const [book1, book2]  = books;

  await prisma.loan.createMany({
    data: [
      {
        // Completed loan — admin borrowed book1 and returned it
        userId:     admin.id,
        bookId:     book1.id,
        loanDate:   new Date('2025-01-10'),
        returnDate: new Date('2025-01-20'),
      },
      {
        // Active loan — member currently has book2 (matches isAvailable: false)
        userId:     member.id,
        bookId:     book2.id,
        loanDate:   new Date('2025-03-01'),
        returnDate: null,
      },
    ],
  });

  console.log('Seed completed successfully!');
  console.log('   admin@library.com  / Password123!');
  console.log('   member@library.com / Password123!');
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}