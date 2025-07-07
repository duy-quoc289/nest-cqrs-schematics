# NestJS CQRS Schematics

Một bộ schematic tự động tạo ra CQRS module hoàn chỉnh cho NestJS với Commands, Queries, Handlers, DTOs và Repository pattern.

## 📋 **Tính năng**

- ✅ **CQRS Pattern** hoàn chỉnh với Commands & Queries
- ✅ **Handlers** được gộp cùng file với Commands/Queries
- ✅ **Repository Pattern** (tùy chọn)
- ✅ **DTOs** với class-validator decorators
- ✅ **Index files** với array exports để quản lý dễ dàng
- ✅ **TypeScript** support đầy đủ
- ✅ **Customizable** qua prompts

## 🚀 **Cài đặt**


### Từ local (development):
```bash
# Clone hoặc download source code
git clone [<repository-url>](https://github.com/duy-quoc289/nest-cqrs-schematics.git)
cd nest-cqrs-schematics

# Build schematic
npm run build

# Install global
npm install -g .
```

### Sử dụng trong project:
```bash
# Cài đặt như dev dependency
npm install --save-dev nest-cqrs-schematics

# Hoặc từ pack
npm pack
npm install --save-dev path/to/source/nest-cqrs-schematics-1.0.0.tgz
```

## 📖 **Sử dụng**

### 1. **Command Line**

```bash
# Tạo CQRS module với tên "user"
schematics nest-cqrs-schematics:cqrs-module --name=user

# Preview trước khi tạo (dry-run)
schematics nest-cqrs-schematics:cqrs-module --name=product --dry-run

# Tạo với options cụ thể
schematics nest-cqrs-schematics:cqrs-module --name=order
```

### 2. **Script trong package.json**

Thêm vào package.json của project:

```json
{
  "scripts": {
    "generate:cqrs": "schematics nest-cqrs-schematics:cqrs-module"
  }
}
```

Sử dụng:
```bash
npm run generate:cqrs -- --name=user
npm run generate:cqrs -- --name=product --dry-run
```

## 🏗️ **Cấu trúc được tạo**

Khi chạy `schematics nest-cqrs-schematics:cqrs-module --name=user`, sẽ tạo ra:

```
src/modules/user/
├── user.module.ts                    # Module chính với import handlers
├── user.controller.ts                # REST API endpoints  
├── user.service.ts                   # Business logic service
├── commands/
│   ├── index.ts                      # Export CommandHandlers array
│   ├── create-user.command.ts        # Create command + handler
│   ├── update-user.command.ts        # Update command + handler
│   └── delete-user.command.ts        # Delete command + handler
├── queries/
│   ├── index.ts                      # Export QueryHandlers array
│   ├── get-user.query.ts             # Get single query + handler
│   └── get-users.query.ts            # Get list query + handler
├── dto/
│   ├── index.ts                      # Export DTOs
│   ├── create-user.dto.ts            # Create DTO với validation
│   └── update-user.dto.ts            # Update DTO
└── repositories/                     
    ├── index.ts                      # Export Repositories array
    └── user.repository.ts            # Repository pattern
```

## ⚙️ **Options**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | string | **required** | Tên của module |
| `path` | string | `src/modules` | Đường dẫn tạo module |

## 📝 **Ví dụ code được tạo**

### **Module:**
```typescript
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';
import { Repositories } from './repositories';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    UserService,
    ...Repositories,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [
    UserService,
    ...Repositories,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class UserModule {}
```

### **Command với Handler:**
```typescript
import { ICommand, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../user.service';

export class CreateUserCommand implements ICommand {
  constructor(public readonly createDto: CreateUserDto) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userService: UserService) {}

  async execute(command: CreateUserCommand) {
    return this.userService.create(command.createDto);
  }
}
```

### **Index exports:**
```typescript
// commands/index.ts
export const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];
```

## 🛠️ **Setup trong project**

### 1. **Cài đặt dependencies:**
```bash
npm install @nestjs/cqrs class-validator class-transformer
```

### 2. **Import module vào AppModule:**
```typescript
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    // ...other modules
  ],
})
export class AppModule {}
```

### 3. **Cấu hình global validation (optional):**
```typescript
// main.ts
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
```

## 🔧 **Development**

### Build schematic:
```bash
npm run build
```

### Test schematic:
```bash
npm run test
```

### Debug với dry-run:
```bash
schematics .:cqrs-module --name=test --dry-run
```

## 📋 **API Endpoints được tạo**

Với module `user`, các endpoints sau sẽ có sẵn:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/user` | Tạo user mới |
| `GET` | `/user` | Lấy danh sách users (có pagination) |
| `GET` | `/user/:id` | Lấy user theo ID |
| `PUT` | `/user/:id` | Cập nhật user |
| `DELETE` | `/user/:id` | Xóa user |

## 🎯 **Best Practices**

1. **Luôn backup project** trước khi chạy schematic
2. **Sử dụng `--dry-run`** để preview trước:
   ```bash
   schematics nest-cqrs-schematics:cqrs-module --name=test --dry-run
   ```
3. **Customize business logic** trong Service và Repository sau khi generate
4. **Thêm validation rules** phù hợp với domain của bạn
5. **Setup database connections** cho Repository nếu cần

## 🤝 **Contributing**

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch  
5. Create Pull Request

## 📄 **License**

MIT

## 🐛 **Issues & Support**

Nếu gặp vấn đề, vui lòng tạo issue tại: GitHub Issues

---

**Happy Coding! 🚀**
