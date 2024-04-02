import { BodyProp, Controller, Get, Path, Put, Route, SuccessResponse } from 'tsoa'
import { getBookInfo } from './get_book_info'
import { getDefaultWarehouseData } from './warehouse_data'
import { type ShelfId, type BookID, type OrderId, type FulfilledBooks } from './documented_types'
import { placeBooksOnShelf } from './place_on_shelf'
import { fulfilOrder } from './fulfil_order'

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

  /**
   * Add copies of a book to a provided shelf
   * @param book The book's unique identifier
   * @param shelf The shelf's name
   * @param number The number of copies to place on the shelf
   */
  @Put('{book}/{shelf}/{number}')
  @SuccessResponse(201, 'Added')
  public async placeBooksOnShelf (@Path() book: BookID, @Path() shelf: ShelfId, @Path() number: number): Promise<void> {
    this.setStatus(201)
    await placeBooksOnShelf(await getDefaultWarehouseData(), book, number, shelf)
  }
}

@Route('fulfil')
export class FulfilOrder extends Controller {
  /**
     * Fulfil an order by taking all the relevant book copies for the order off the shelves
     * @param order The Order ID
     * @param booksFulfilled An array lsting how many copies of each book were taken from each shelf
     */
  @Put('{order}')
  @SuccessResponse(201, 'Fulfilled')
  public async fulfilOrder (
    @Path() order: OrderId,
      @BodyProp('booksFulfilled') booksFulfilled: FulfilledBooks
  ): Promise<void> {
    this.setStatus(201)
    try {
      await fulfilOrder(await getDefaultWarehouseData(), order, booksFulfilled)
      this.setStatus(201)
    } catch (e) {
      this.setStatus(500)
      console.error('Error Fulfilling Order', e)
    }
  }
}
