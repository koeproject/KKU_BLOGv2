// Define `Post` type
type post = {
  title:string,
  content:string,  
  image:string,
  userId:Int,
  categoryId:Int?,
  like:Int,
  status:Boolean
};

id         Int      @id @default(autoincrement())
  title      String  
  content    String  
  image      String?  
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  userId     Int
  categoryId Int?
  like       Int @default(0) // เพิ่ม
  status     Boolean @default(false) // ไม่อนุมัติ