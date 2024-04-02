import { Get, Path, Route } from 'tsoa'
import { getBookInfo } from './get_book_info'
import { getDefaultWarehouseData } from './warehouse_data'
import { type BookID } from './documented_types'

@Route('warehouse')
export class WarehouseRoutes {
  /**
     * Find the shelves that have copies of the book, and how
     * many copies each shelf has
     * @param book The book's unique identifier!
     * @returns {BookInfo}
     */
  @Get('{book}')
  public async getBookInfo (
    @Path() book: BookID
  ): Promise<Record<string, number>> {
    return await getBookInfo(await getDefaultWarehouseData(), book)
  }
}
