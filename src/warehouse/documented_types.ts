/**
 * A unique identifier for a particular book
 */
export type BookID = string

/**
 * A unique identifier for a particular order
 */
export type OrderId = string

/**
 * The name of a shelf
 */
export type ShelfId = string

/**
 * An array listing how many copies of each book are taken from a given shelf while fulfilling an order
 */
export type FulfilledBooks = Array<{ book: BookID, shelf: ShelfId, numberOfBooks: number }>
