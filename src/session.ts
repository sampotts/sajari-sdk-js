/* tslint:disable:max-classes-per-file */

import { Values } from "./types";

/**
 * Tracking defines behaviour for handling search sessions and result interactions.
 */
export interface Tracking {
  /*
   * type specifies which kind of tokens (if any) should be generated and returned
   * with the query results.
   */
  type: TrackingType;

  /*
   * query_id is a unique identifier for a single search query.  In the
   * case of search-as-you-type style interactions, this is defined to be multiple
   * individual queries (i.e. as a user types the query is re-run).
   * To identify the individual queries use the [[Tracking.sequence]] number.
   */
  query_id: string;

  /* 
   * sequence (i.e. sequential identifier) in the context of a sequence of queries with
   * the same query_id.
   */
  sequence: number;

  /** field is a unique field on each result used to associate tracking information to the result. */
  field: string;

  /** data values which will be recorded along with query requests. */
  data: Values;
}

/**
 * Session takes query values, maintains session state, and returns tracking data
 * to be sent with search requests.
 */
export interface Session {
  next(values: Values): [Tracking, null] | [undefined, Error];
  reset(): void;
}

/** TrackingType defines the possible result-interaction tracking types used by [[DefaultSession]] */
export enum TrackingType {
  /** None disables tracking. */
  None = "NONE",
  /** Click generates click tracking tokens. */
  Click = "CLICK",
  /** PosNeg creates pos/neg tracking tokens. */
  PosNeg = "POS_NEG"
}

/**
 * InteractiveSession creates a session based on text searches and is recommended
 * for use in search-as-you-type style interfaces.
 *
 * It resets the session if the search query value:
 *
 * - Is `undefined`.
 * - First 3 characters have changed (i.e. from a direct replacement)
 * - Cleared after being non-empty (i.e. from a delete)
 */
export class InteractiveSession implements Session {
  private queryLabel: string;
  private session: Session;
  private lastQuery: string = "";

  /** Construts an instance of InteractiveSession. */
  public constructor(queryLabel: string, session: Session) {
    this.queryLabel = queryLabel;
    this.session = session;
  }

  /**
   * next merges new values into the session and returns tracking data to be sent with search requests.
   * The behaviour follows the steps described in the class documentation above.
   */
  public next(values: Values): [Tracking, null] | [undefined, Error] {
    const text = values[this.queryLabel];
    if (text === undefined) {
      this.reset();
      return this.session.next(values);
    }

    const shortenedPrevQ = this.lastQuery.substr(0, Math.min(text.length, 3));
    const first3CharactersChanged = !(
      text.substr(0, shortenedPrevQ.length) === shortenedPrevQ
    );
    const queryCleared = this.lastQuery.length > 0 && text.length === 0;
    if (first3CharactersChanged || queryCleared) {
      this.reset();
    }
    this.lastQuery = text;

    return this.session.next(values);
  }

  /** reset resets the session instance to its empty state. */
  public reset(): void {
    this.session.reset();
  }
}

/** DefaultSession holds state of a sequence of searches. */
export class DefaultSession implements Session {
  private queryID: string = "";
  private sequence: number = 0;

  private trackingType: TrackingType;
  private field: string;
  private sessionData: Values;

  /** Constructs an instance of DefaultSession. */
  public constructor(trackingType: TrackingType, field: string, data: Values) {
    this.trackingType = trackingType;
    this.field = field;
    this.sessionData = data;
  }

  /** next merges new values into the session and returns tracking data to be sent with search requests. */
  public next(values: Values): [Tracking, null] | [undefined, Error] {
    if (this.queryID === "") {
      this.queryID = newQueryID();
      this.sequence = 0;
    } else {
      this.sequence++;
    }

    return [
      {
        type: this.trackingType,
        query_id: this.queryID,
        sequence: this.sequence,
        field: this.field,
        data: this.sessionData
      } as Tracking,
      null
    ];
  }

  /** reset resets the session instance to its empty state. */
  public reset(): void {
    this.queryID = "";
    this.sequence = 0;
  }
}

/**
 * newQueryID constructs a new ID for a query.
 * @hidden
 */
const newQueryID = (): string => {
  let queryID = "";
  for (let i = 0; i < 16; i++) {
    queryID += "abcdefghijklmnopqrstuvwxyz0123456789".charAt(
      Math.floor(Math.random() * 36)
    );
  }
  return queryID;
};
