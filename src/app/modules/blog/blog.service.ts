import slugify from 'slugify';
import { IBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import { nanoid } from 'nanoid';
import Comment from '../comments/comments.model';

const createBlogServiceToDB = async (blogData: IBlog, user: string) => {
  blogData.author = user;
  blogData.slug = slugify(`${blogData.title}-${nanoid(5)}`, {
    lower: true,
  });
  const result = await BlogModel.create(blogData);
  return result;
};

const getAllBlogServiceToDB = async ({
  limit,
  page,
}: {
  limit: string;
  page: string;
}) => {
  const result = await BlogModel.find()
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit))
    .sort({ createdAt: -1 })
    .populate('author', 'name email image website verified createdAt');
  return result;
};

const getSingleBlogServiceToDB = async (slug: string) => {
  const result = await BlogModel.findOne({ slug: slug }).populate(
    'author',
    'name email image website verified createdAt'
  );

  /*
   * Refactored to query directly from DB instead of fetching all and filtering.
   * This is efficient and avoids issues with missing fields in legacy data.
   */
  const commentsByBlog = await Comment.find({
    type: 'blog',
    blog: result?._id,
  })
    .sort({ createdAt: -1 })
    .populate('owner', 'name role email image createdAt');

  return { result, commentsByBlog };
};

const updateBlogServiceToDB = async (id: string, blogData: IBlog) => {
  const result = await BlogModel.findByIdAndUpdate(id, blogData, {
    new: true,
  });
  return result;
};

const deleteBlogServiceToDB = async (id: string) => {
  const result = await BlogModel.findByIdAndDelete(id);
  return result;
};

export const BlogService = {
  createBlogServiceToDB,
  getAllBlogServiceToDB,
  getSingleBlogServiceToDB,
  updateBlogServiceToDB,
  deleteBlogServiceToDB,
};
