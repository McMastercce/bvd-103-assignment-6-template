import { Controller, Get, Path, Put, Route, SuccessResponse } from 'tsoa'
import { getBookInfo } from './get_book_info'
import { getDefaultWarehouseData } from './warehouse_data'
import { type ShelfId, type BookID } from './documented_types'
import { placeBooksOnShelf } from './place_on_shelf'

@Route('warehouse')
export class WarehouseRoutes extends Controller {
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

  @Put('{book}/{shelf}/{number}')
  @SuccessResponse(201, 'Added')
  public async placeBooksOnShelf (@Path() book: BookID, @Path() shelf: ShelfId, @Path() number: number): Promise<void> {
    this.setStatus(201)
    await placeBooksOnShelf(await getDefaultWarehouseData(), book, number, shelf)
  }
}
