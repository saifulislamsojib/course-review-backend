# Course Review Api

## API Endpoints
#### 1. Create a Course - /api/course
Course crete api must provide some data in body `title`, `instructor`, `categoryId`, `price`, `tags` array of object, `startDate`, `endDate`, `language`, `provider` and `details`

#### 2. Get Paginated and Filtered Courses - /api/courses
for paginate `page` & `limit`, for sort `sortBy` & `sortOrder`, `minPrice`, `maxPrice`, `tags`, `startDate`, `endDate`, `language`, `provider`, `durationInWeeks`, `level` in query parameters and all are optional.

#### 3. Create a Category - /api/categories
Category crete api must provide `name` in body

#### 4. Get All Categories - /api/categories

#### 5. Create a Review - /api/reviews
Review crete api must provide some data in body `courseId`, `rating`, `review`







 