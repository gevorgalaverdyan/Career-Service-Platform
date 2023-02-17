/**
 * @remarks
 * Postings list will contain posting with the following fields
 */
export interface Posting {
  posting: {
    id: number;
    title: string;
    deadline: string;
    location: string;
  };
}
