import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import slugify from 'slugify';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ForumCategoryService } from './forums-category.service';

// Mapping: type → section title + theme (exactly matching your demo)
const typeToSectionConfig: Record<
  string,
  { sectionTitle: string; theme: string }
> = {
  introductions: { sectionTitle: 'Introductions', theme: 'blue' },
  cultural: {
    sectionTitle: 'Cultural & Historical Discussions',
    theme: 'green',
  },
  rebuilding: { sectionTitle: 'Rebuilding & Innovation', theme: 'gold' },
  materials: {
    sectionTitle: 'Materials, Construction & Design',
    theme: 'orange',
  },
  interactive: {
    sectionTitle: 'Interactive & Engagement Spaces',
    theme: 'purple',
  },
  community: {
    sectionTitle: 'Community & Professional Networking',
    theme: 'red',
  },
};
const createForumCategory = catchAsync(async (req: Request, res: Response) => {
  const { ...body } = req.body;
  const slug = slugify(body.title, {
    lower: true,
  });
  body.slug = slug;
  const result = await ForumCategoryService.createForumCategoryToDB(body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'ForumCategory created successfully',
    data: result,
  });
});

const getForumByCategory = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await ForumCategoryService.getForumByCategoryToDB(slug);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'ForumCategory fetched successfully',
    data: result,
  });
});

const getForumCategories = catchAsync(async (req: Request, res: Response) => {
  // Fetch raw categories from DB
  const categories = await ForumCategoryService.getForumCategoriesToDB();

  // Group and transform into the frontend-friendly structure
  const groupedSections: Record<
    string,
    { title: string; theme: string; items: any[] }
  > = {};

  categories.forEach((category: any) => {
    const type = category.type;
    const config = typeToSectionConfig[type] || {
      sectionTitle: type.charAt(0).toUpperCase() + type.slice(1),
      theme: 'blue',
    };

    if (!groupedSections[type]) {
      groupedSections[type] = {
        title: config.sectionTitle,
        theme: config.theme,
        items: [],
      };
    }

    const item = {
      id: category._id.toString(),
      title: category.title,
      description: category.description,
      stats: {
        posts: category.posts?.length || 0,
        views: category.views || 0,
        // You can enhance these later with actual last post data
        // lastUpdated: "Yesterday at 2:02 PM",
        // updatedBy: "username",
      },
      link: `${category.slug}`,
      iconType: category.type,
      icon: category.icon, // optional, if your frontend uses it
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };

    groupedSections[type].items.push(item);
  });

  // Convert to array and preserve desired order (matching your demo)
  const orderedSections = [
    groupedSections['introductions'],
    groupedSections['cultural'], // contains multiple cultural categories
    groupedSections['rebuilding'],
    groupedSections['materials'],
    groupedSections['interactive'],
    groupedSections['community'],
  ].filter(Boolean); // remove undefined if any type is missing

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Forum categories fetched successfully',
    data: orderedSections,
  });
});

const getForumCategoryOnly = catchAsync(async (req: Request, res: Response) => {
  const result = await ForumCategoryService.getForumCategoryByTypeToDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Forum category fetched successfully',
    data: result,
  });
});

export const ForumCategoryController = {
  createForumCategory,
  getForumByCategory,
  getForumCategories,
  getForumCategoryOnly,
};
