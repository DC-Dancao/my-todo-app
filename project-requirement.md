一、测试说明
职位： 全栈开发工程师（Next.js方向） 
Next.js开发能力、数据库操作能力、AI编程能力及部署能力
二、题目要求
项目名称：TodoList任务管理应用
应用场景说明： 请开发一个简单实用的TodoList任务管理Web应用。用户可以创建待办
事项，标记完成状态，对任务进行分类管理。这是一个日常工作中常用的效率工具。
必做功能（70分）
1. 技术栈要求
使用 Next.js 15
使用 TypeScript
使用 Tailwind CSS 进行样式开发
数据库使用Postgres
2. 核心功能
添加新的待办任务（标题+描述）
编辑和删除任务
标记任务完成/未完成状态
任务列表展示（显示所有任务）
任务按创建时间排序
3. 基础要求
响应式设计（移动端友好）
合理的错误处理
加载状态提示
空状态处理
加分功能（30分，选做2-3项）
1. 数据导入导出（15分）⭐强烈推荐
支持从CSV/Excel文件导入任务
导出任务列表为CSV格式
文件格式验证和错误提示
2. 数据统计看板（15分）⭐强烈推荐
任务完成率统计
分类任务分布图表（使用Chart.js、Recharts或ECharts）
本周/本月任务趋势
3. AI任务助手（15分）⭐强烈推荐
根据标题AI生成任务描述
智能推荐任务分类
使用免费AI API（如Cohere、HuggingFace等）
4. 高级搜索与过滤（10分）
多条件组合筛选（状态+分类+日期）
实时搜索（带防抖）
搜索历史记录
5. 批量操作（10分）
批量选择任务
批量删除/标记完成
全选/反选功能
6. 任务分类管理（8分）
创建/编辑/删除分类
分类颜色标识
按分类筛选显示
7. 拖拽排序（8分）
手动拖拽调整任务顺序
任务在分类间拖拽移动
顺序自动保存
8. 深色模式（5分）
明暗主题切换
跟随系统设置
保存用户偏好
三、提交要求
必须提交的内容：
1. GitHub仓库链接
仓库必须设置为Public
包含完整的提交历史
代码结构清晰，注释适当
2. Vercel部署链接
项目必须成功部署在Vercel上
所有功能可正常访问使用
数据库连接正常
3. README文档
项目介绍
功能清单
本地运行步骤
环境变量配置说明
使用的技术栈列表
四、评分标准
功能完整性（30分）
所有必做功能正常工作
数据增删改查无错误
用户体验流畅
代码质量（25分）
代码结构清晰合理
TypeScript类型定义完善
组件复用性好
遵循React/Next.js最佳实践
UI/UX设计（15分）
界面美观整洁
交互友好直观
响应式布局完善
加载和错误状态处理得当
部署配置（15分）
Vercel部署成功
环境变量配置正确
性能优化（如图片优化）
SEO基础配置
文档质量（10分）
README清晰完整
代码注释适当
Git提交信息规范
加分项（5分）
实现额外功能
创新性设计
性能优化
测试代码
五、技术提示
1. 推荐的项目初始化命令：
npx create-next-app@latest my-todo-app --typescript --tailwind --app
2. 推荐的依赖库：
数据库ORM：Drizzle ORM 或 Prisma
UI样式：Tailwind CSS（必须使用）
UI组件：shadcn/ui
图标：Font Awesome 或 lucide-react
日期处理：date-fns（如需处理截止日期）
3. 数据库Schema参考：
// 任务表结构示例
{
 id: string (primary key)
 title: string
 description: text (可选)
 completed: boolean (默认false)
 priority: string (可选：high/medium/low)
 category: string (可选)
 dueDate: timestamp (可选)
 createdAt: timestamp
 updatedAt: timestamp
}
六、注意事项
1. 时间管理
请在收到题目后48小时内提交
建议先完成核心功能，再考虑加分项
2. 代码规范
必须使用 Claude Code 或 Cursor 作为开发工具
允许使用AI辅助编程，但需理解代码逻辑
可以参考文档和开源项目
代码必须能够讲解清楚实现思路
3. 提交方式
将GitHub链接和Vercel链接发送至HR微信
4. 常见问题
如遇到技术问题，可发邮件咨询（仅限环境配置问题）
Vercel和Supabase都有免费套餐，无需付费
请确保部署链接在评审期间保持可访问
七、参考资源
Next.js 15文档
Vercel部署指南
Supabase快速开始
Tailwind CSS文档