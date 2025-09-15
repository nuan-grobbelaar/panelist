import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CatService } from './cat.service';
import { inertia } from '../../util/Inertia';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatWebController {
  constructor(private readonly catService: CatService) {}

  @Get()
  async index(@Res() res: Response) {
    const cats = await this.catService.findAll();
    return inertia(res, 'Cats', { cats });
  }
}

@Controller('api/cats')
export class CatApiController {
  constructor(private readonly catService: CatService) {}

  @Get('')
  getAllCats(): Promise<Cat[]> {
    return this.catService.findAll();
  }
}
