export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: string
}

export type Activity = Node & {
  annictId: Scalars['Int']
  /** ID of the object. */
  id: Scalars['ID']
  user: User
}

export enum ActivityAction {
  Create = 'CREATE',
}

/** The connection type for Activity. */
export type ActivityConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<ActivityEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<Activity>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type ActivityEdge = {
  action: ActivityAction
  annictId: Scalars['Int']
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  item: Maybe<ActivityItem>
  /**
   * Deprecated: Use `item` instead.
   * @deprecated Use `item` instead.
   */
  node: Maybe<ActivityItem>
  user: User
}

export type ActivityItem = MultipleRecord | Record | Review | Status

export type ActivityOrder = {
  direction: OrderDirection
  field: ActivityOrderField
}

export enum ActivityOrderField {
  CreatedAt = 'CREATED_AT',
}

export type Cast = Node & {
  annictId: Scalars['Int']
  character: Character
  id: Scalars['ID']
  name: Scalars['String']
  nameEn: Scalars['String']
  person: Person
  sortNumber: Scalars['Int']
  work: Work
}

/** The connection type for Cast. */
export type CastConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<CastEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<Cast>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type CastEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node: Maybe<Cast>
}

export type CastOrder = {
  direction: OrderDirection
  field: CastOrderField
}

export enum CastOrderField {
  CreatedAt = 'CREATED_AT',
  SortNumber = 'SORT_NUMBER',
}

export type Channel = Node & {
  annictId: Scalars['Int']
  channelGroup: ChannelGroup
  id: Scalars['ID']
  name: Scalars['String']
  programs: Maybe<ProgramConnection>
  published: Scalars['Boolean']
  scChid: Scalars['Int']
}

export type ChannelProgramsArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
}

/** The connection type for Channel. */
export type ChannelConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<ChannelEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<Channel>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type ChannelEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node: Maybe<Channel>
}

export type ChannelGroup = Node & {
  annictId: Scalars['Int']
  channels: Maybe<ChannelConnection>
  id: Scalars['ID']
  name: Scalars['String']
  sortNumber: Scalars['Int']
}

export type ChannelGroupChannelsArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
}

export type Character = Node & {
  age: Scalars['String']
  ageEn: Scalars['String']
  annictId: Scalars['Int']
  birthday: Scalars['String']
  birthdayEn: Scalars['String']
  bloodType: Scalars['String']
  bloodTypeEn: Scalars['String']
  description: Scalars['String']
  descriptionEn: Scalars['String']
  descriptionSource: Scalars['String']
  descriptionSourceEn: Scalars['String']
  favoriteCharactersCount: Scalars['Int']
  height: Scalars['String']
  heightEn: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
  nameEn: Scalars['String']
  nameKana: Scalars['String']
  nationality: Scalars['String']
  nationalityEn: Scalars['String']
  nickname: Scalars['String']
  nicknameEn: Scalars['String']
  occupation: Scalars['String']
  occupationEn: Scalars['String']
  series: Series
  weight: Scalars['String']
  weightEn: Scalars['String']
}

/** The connection type for Character. */
export type CharacterConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<CharacterEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<Character>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type CharacterEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node: Maybe<Character>
}

export type CharacterOrder = {
  direction: OrderDirection
  field: CharacterOrderField
}

export enum CharacterOrderField {
  CreatedAt = 'CREATED_AT',
  FavoriteCharactersCount = 'FAVORITE_CHARACTERS_COUNT',
}

/** Autogenerated input type of CreateRecord */
export type CreateRecordInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: InputMaybe<Scalars['String']>
  comment: InputMaybe<Scalars['String']>
  episodeId: Scalars['ID']
  ratingState: InputMaybe<RatingState>
  shareFacebook: InputMaybe<Scalars['Boolean']>
  shareTwitter: InputMaybe<Scalars['Boolean']>
}

/** Autogenerated return type of CreateRecord */
export type CreateRecordPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>
  record: Maybe<Record>
}

/** Autogenerated input type of CreateReview */
export type CreateReviewInput = {
  body: Scalars['String']
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: InputMaybe<Scalars['String']>
  ratingAnimationState: InputMaybe<RatingState>
  ratingCharacterState: InputMaybe<RatingState>
  ratingMusicState: InputMaybe<RatingState>
  ratingOverallState: InputMaybe<RatingState>
  ratingStoryState: InputMaybe<RatingState>
  shareFacebook: InputMaybe<Scalars['Boolean']>
  shareTwitter: InputMaybe<Scalars['Boolean']>
  title: InputMaybe<Scalars['String']>
  workId: Scalars['ID']
}

/** Autogenerated return type of CreateReview */
export type CreateReviewPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>
  review: Maybe<Review>
}

/** Autogenerated input type of DeleteRecord */
export type DeleteRecordInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: InputMaybe<Scalars['String']>
  recordId: Scalars['ID']
}

/** Autogenerated return type of DeleteRecord */
export type DeleteRecordPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>
  episode: Maybe<Episode>
}

/** Autogenerated input type of DeleteReview */
export type DeleteReviewInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: InputMaybe<Scalars['String']>
  reviewId: Scalars['ID']
}

/** Autogenerated return type of DeleteReview */
export type DeleteReviewPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>
  work: Maybe<Work>
}

/** An episode of a work */
export type Episode = Node & {
  annictId: Scalars['Int']
  id: Scalars['ID']
  nextEpisode: Maybe<Episode>
  number: Maybe<Scalars['Int']>
  numberText: Maybe<Scalars['String']>
  prevEpisode: Maybe<Episode>
  recordCommentsCount: Scalars['Int']
  records: Maybe<RecordConnection>
  recordsCount: Scalars['Int']
  satisfactionRate: Maybe<Scalars['Float']>
  sortNumber: Scalars['Int']
  title: Maybe<Scalars['String']>
  viewerDidTrack: Scalars['Boolean']
  viewerRecordsCount: Scalars['Int']
  work: Work
}

/** An episode of a work */
export type EpisodeRecordsArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  hasComment: InputMaybe<Scalars['Boolean']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<RecordOrder>
}

/** The connection type for Episode. */
export type EpisodeConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<EpisodeEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<Episode>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type EpisodeEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node: Maybe<Episode>
}

export type EpisodeOrder = {
  direction: OrderDirection
  field: EpisodeOrderField
}

export enum EpisodeOrderField {
  CreatedAt = 'CREATED_AT',
  SortNumber = 'SORT_NUMBER',
}

export type LibraryEntry = Node & {
  id: Scalars['ID']
  nextEpisode: Maybe<Episode>
  nextProgram: Maybe<Program>
  note: Scalars['String']
  status: Maybe<Status>
  user: User
  work: Work
}

/** The connection type for LibraryEntry. */
export type LibraryEntryConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<LibraryEntryEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<LibraryEntry>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type LibraryEntryEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node: Maybe<LibraryEntry>
}

export type LibraryEntryOrder = {
  direction: OrderDirection
  field: LibraryEntryOrderField
}

export enum LibraryEntryOrderField {
  /** 最後に記録またはスキップした日時 */
  LastTrackedAt = 'LAST_TRACKED_AT',
}

/** Media of anime */
export enum Media {
  Movie = 'MOVIE',
  Other = 'OTHER',
  Ova = 'OVA',
  Tv = 'TV',
  Web = 'WEB',
}

export type MultipleRecord = Node & {
  annictId: Scalars['Int']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  records: Maybe<RecordConnection>
  user: User
  work: Work
}

export type MultipleRecordRecordsArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
}

export type Mutation = {
  createRecord: Maybe<CreateRecordPayload>
  createReview: Maybe<CreateReviewPayload>
  deleteRecord: Maybe<DeleteRecordPayload>
  deleteReview: Maybe<DeleteReviewPayload>
  updateRecord: Maybe<UpdateRecordPayload>
  updateReview: Maybe<UpdateReviewPayload>
  updateStatus: Maybe<UpdateStatusPayload>
}

export type MutationCreateRecordArgs = {
  input: CreateRecordInput
}

export type MutationCreateReviewArgs = {
  input: CreateReviewInput
}

export type MutationDeleteRecordArgs = {
  input: DeleteRecordInput
}

export type MutationDeleteReviewArgs = {
  input: DeleteReviewInput
}

export type MutationUpdateRecordArgs = {
  input: UpdateRecordInput
}

export type MutationUpdateReviewArgs = {
  input: UpdateReviewInput
}

export type MutationUpdateStatusArgs = {
  input: UpdateStatusInput
}

/** An object with an ID. */
export type Node = {
  /** ID of the object. */
  id: Scalars['ID']
}

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type Organization = Node & {
  annictId: Scalars['Int']
  favoriteOrganizationsCount: Scalars['Int']
  id: Scalars['ID']
  name: Scalars['String']
  nameEn: Scalars['String']
  nameKana: Scalars['String']
  staffsCount: Scalars['Int']
  twitterUsername: Scalars['String']
  twitterUsernameEn: Scalars['String']
  url: Scalars['String']
  urlEn: Scalars['String']
  wikipediaUrl: Scalars['String']
  wikipediaUrlEn: Scalars['String']
}

/** The connection type for Organization. */
export type OrganizationConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<OrganizationEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<Organization>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type OrganizationEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node: Maybe<Organization>
}

export type OrganizationOrder = {
  direction: OrderDirection
  field: OrganizationOrderField
}

export enum OrganizationOrderField {
  CreatedAt = 'CREATED_AT',
  FavoriteOrganizationsCount = 'FAVORITE_ORGANIZATIONS_COUNT',
}

/** Information about pagination in a connection. */
export type PageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars['String']>
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars['String']>
}

export type Person = Node & {
  annictId: Scalars['Int']
  birthday: Scalars['String']
  bloodType: Scalars['String']
  castsCount: Scalars['Int']
  favoritePeopleCount: Scalars['Int']
  genderText: Scalars['String']
  height: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
  nameEn: Scalars['String']
  nameKana: Scalars['String']
  nickname: Scalars['String']
  nicknameEn: Scalars['String']
  prefecture: Prefecture
  staffsCount: Scalars['Int']
  twitterUsername: Scalars['String']
  twitterUsernameEn: Scalars['String']
  url: Scalars['String']
  urlEn: Scalars['String']
  wikipediaUrl: Scalars['String']
  wikipediaUrlEn: Scalars['String']
}

/** The connection type for Person. */
export type PersonConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<PersonEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<Person>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type PersonEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node: Maybe<Person>
}

export type PersonOrder = {
  direction: OrderDirection
  field: PersonOrderField
}

export enum PersonOrderField {
  CreatedAt = 'CREATED_AT',
  FavoritePeopleCount = 'FAVORITE_PEOPLE_COUNT',
}

export type Prefecture = Node & {
  annictId: Scalars['Int']
  id: Scalars['ID']
  name: Scalars['String']
}

export type Program = Node & {
  annictId: Scalars['Int']
  channel: Channel
  episode: Episode
  id: Scalars['ID']
  rebroadcast: Scalars['Boolean']
  scPid: Maybe<Scalars['Int']>
  startedAt: Scalars['DateTime']
  state: ProgramState
  work: Work
}

/** The connection type for Program. */
export type ProgramConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<ProgramEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<Program>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type ProgramEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node: Maybe<Program>
}

export type ProgramOrder = {
  direction: OrderDirection
  field: ProgramOrderField
}

export enum ProgramOrderField {
  StartedAt = 'STARTED_AT',
}

export enum ProgramState {
  Hidden = 'HIDDEN',
  Published = 'PUBLISHED',
}

export type Query = {
  /** Fetches an object given its ID. */
  node: Maybe<Node>
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>
  searchCharacters: Maybe<CharacterConnection>
  searchEpisodes: Maybe<EpisodeConnection>
  searchOrganizations: Maybe<OrganizationConnection>
  searchPeople: Maybe<PersonConnection>
  searchWorks: Maybe<WorkConnection>
  user: Maybe<User>
  viewer: Maybe<User>
}

export type QueryNodeArgs = {
  id: Scalars['ID']
}

export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>
}

export type QuerySearchCharactersArgs = {
  after: InputMaybe<Scalars['String']>
  annictIds: InputMaybe<Array<Scalars['Int']>>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  names: InputMaybe<Array<Scalars['String']>>
  orderBy: InputMaybe<CharacterOrder>
}

export type QuerySearchEpisodesArgs = {
  after: InputMaybe<Scalars['String']>
  annictIds: InputMaybe<Array<Scalars['Int']>>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<EpisodeOrder>
}

export type QuerySearchOrganizationsArgs = {
  after: InputMaybe<Scalars['String']>
  annictIds: InputMaybe<Array<Scalars['Int']>>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  names: InputMaybe<Array<Scalars['String']>>
  orderBy: InputMaybe<OrganizationOrder>
}

export type QuerySearchPeopleArgs = {
  after: InputMaybe<Scalars['String']>
  annictIds: InputMaybe<Array<Scalars['Int']>>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  names: InputMaybe<Array<Scalars['String']>>
  orderBy: InputMaybe<PersonOrder>
}

export type QuerySearchWorksArgs = {
  after: InputMaybe<Scalars['String']>
  annictIds: InputMaybe<Array<Scalars['Int']>>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<WorkOrder>
  seasons: InputMaybe<Array<Scalars['String']>>
  titles: InputMaybe<Array<Scalars['String']>>
}

export type QueryUserArgs = {
  username: Scalars['String']
}

export enum RatingState {
  Average = 'AVERAGE',
  Bad = 'BAD',
  Good = 'GOOD',
  Great = 'GREAT',
}

export type Record = Node & {
  annictId: Scalars['Int']
  comment: Maybe<Scalars['String']>
  commentsCount: Scalars['Int']
  createdAt: Scalars['DateTime']
  episode: Episode
  facebookClickCount: Scalars['Int']
  id: Scalars['ID']
  likesCount: Scalars['Int']
  modified: Scalars['Boolean']
  rating: Maybe<Scalars['Float']>
  ratingState: Maybe<RatingState>
  twitterClickCount: Scalars['Int']
  updatedAt: Scalars['DateTime']
  user: User
  work: Work
}

/** The connection type for Record. */
export type RecordConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<RecordEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<Record>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type RecordEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node: Maybe<Record>
}

export type RecordOrder = {
  direction: OrderDirection
  field: RecordOrderField
}

export enum RecordOrderField {
  CreatedAt = 'CREATED_AT',
  LikesCount = 'LIKES_COUNT',
}

export type Review = Node & {
  annictId: Scalars['Int']
  body: Scalars['String']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  impressionsCount: Scalars['Int']
  likesCount: Scalars['Int']
  modifiedAt: Maybe<Scalars['DateTime']>
  ratingAnimationState: Maybe<RatingState>
  ratingCharacterState: Maybe<RatingState>
  ratingMusicState: Maybe<RatingState>
  ratingOverallState: Maybe<RatingState>
  ratingStoryState: Maybe<RatingState>
  title: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  user: User
  work: Work
}

/** The connection type for Review. */
export type ReviewConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<ReviewEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<Review>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type ReviewEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node: Maybe<Review>
}

export type ReviewOrder = {
  direction: OrderDirection
  field: ReviewOrderField
}

export enum ReviewOrderField {
  CreatedAt = 'CREATED_AT',
  LikesCount = 'LIKES_COUNT',
}

/** Season name */
export enum SeasonName {
  Autumn = 'AUTUMN',
  Spring = 'SPRING',
  Summer = 'SUMMER',
  Winter = 'WINTER',
}

export type Series = Node & {
  annictId: Scalars['Int']
  id: Scalars['ID']
  name: Scalars['String']
  nameEn: Scalars['String']
  nameRo: Scalars['String']
  works: Maybe<SeriesWorkConnection>
}

export type SeriesWorksArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<SeriesWorkOrder>
}

/** The connection type for Series. */
export type SeriesConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<SeriesEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<Series>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type SeriesEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node: Maybe<Series>
}

/** The connection type for Work. */
export type SeriesWorkConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<SeriesWorkEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<Work>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type SeriesWorkEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  item: Work
  /**
   * Deprecated: Use `item` instead.
   * @deprecated Use `item` instead.
   */
  node: Work
  summary: Maybe<Scalars['String']>
  summaryEn: Maybe<Scalars['String']>
}

export type SeriesWorkOrder = {
  direction: OrderDirection
  field: SeriesWorkOrderField
}

export enum SeriesWorkOrderField {
  Season = 'SEASON',
}

export type Staff = Node & {
  annictId: Scalars['Int']
  id: Scalars['ID']
  name: Scalars['String']
  nameEn: Scalars['String']
  resource: StaffResourceItem
  roleOther: Scalars['String']
  roleOtherEn: Scalars['String']
  roleText: Scalars['String']
  sortNumber: Scalars['Int']
  work: Work
}

/** The connection type for Staff. */
export type StaffConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<StaffEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<Staff>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type StaffEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node: Maybe<Staff>
}

export type StaffOrder = {
  direction: OrderDirection
  field: StaffOrderField
}

export enum StaffOrderField {
  CreatedAt = 'CREATED_AT',
  SortNumber = 'SORT_NUMBER',
}

export type StaffResourceItem = Organization | Person

export type Status = Node & {
  annictId: Scalars['Int']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  likesCount: Scalars['Int']
  state: StatusState
  user: User
  work: Work
}

export enum StatusState {
  NoState = 'NO_STATE',
  OnHold = 'ON_HOLD',
  StopWatching = 'STOP_WATCHING',
  WannaWatch = 'WANNA_WATCH',
  Watched = 'WATCHED',
  Watching = 'WATCHING',
}

/** Autogenerated input type of UpdateRecord */
export type UpdateRecordInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: InputMaybe<Scalars['String']>
  comment: InputMaybe<Scalars['String']>
  ratingState: InputMaybe<RatingState>
  recordId: Scalars['ID']
  shareFacebook: InputMaybe<Scalars['Boolean']>
  shareTwitter: InputMaybe<Scalars['Boolean']>
}

/** Autogenerated return type of UpdateRecord */
export type UpdateRecordPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>
  record: Maybe<Record>
}

/** Autogenerated input type of UpdateReview */
export type UpdateReviewInput = {
  body: Scalars['String']
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: InputMaybe<Scalars['String']>
  ratingAnimationState: RatingState
  ratingCharacterState: RatingState
  ratingMusicState: RatingState
  ratingOverallState: RatingState
  ratingStoryState: RatingState
  reviewId: Scalars['ID']
  shareFacebook: InputMaybe<Scalars['Boolean']>
  shareTwitter: InputMaybe<Scalars['Boolean']>
  title: InputMaybe<Scalars['String']>
}

/** Autogenerated return type of UpdateReview */
export type UpdateReviewPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>
  review: Maybe<Review>
}

/** Autogenerated input type of UpdateStatus */
export type UpdateStatusInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: InputMaybe<Scalars['String']>
  state: StatusState
  workId: Scalars['ID']
}

/** Autogenerated return type of UpdateStatus */
export type UpdateStatusPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>
  work: Maybe<Work>
}

export type User = Node & {
  activities: Maybe<ActivityConnection>
  annictId: Scalars['Int']
  avatarUrl: Maybe<Scalars['String']>
  backgroundImageUrl: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  email: Maybe<Scalars['String']>
  followers: Maybe<UserConnection>
  followersCount: Scalars['Int']
  following: Maybe<UserConnection>
  followingActivities: Maybe<ActivityConnection>
  followingsCount: Scalars['Int']
  id: Scalars['ID']
  libraryEntries: Maybe<LibraryEntryConnection>
  name: Scalars['String']
  notificationsCount: Maybe<Scalars['Int']>
  onHoldCount: Scalars['Int']
  programs: Maybe<ProgramConnection>
  records: Maybe<RecordConnection>
  recordsCount: Scalars['Int']
  stopWatchingCount: Scalars['Int']
  url: Maybe<Scalars['String']>
  username: Scalars['String']
  viewerCanFollow: Scalars['Boolean']
  viewerIsFollowing: Scalars['Boolean']
  wannaWatchCount: Scalars['Int']
  watchedCount: Scalars['Int']
  watchingCount: Scalars['Int']
  works: Maybe<WorkConnection>
}

export type UserActivitiesArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<ActivityOrder>
}

export type UserFollowersArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
}

export type UserFollowingArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
}

export type UserFollowingActivitiesArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<ActivityOrder>
}

export type UserLibraryEntriesArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<LibraryEntryOrder>
  seasonFrom: InputMaybe<Scalars['String']>
  seasonUntil: InputMaybe<Scalars['String']>
  seasons: InputMaybe<Array<Scalars['String']>>
  states: InputMaybe<Array<StatusState>>
}

export type UserProgramsArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<ProgramOrder>
  unwatched: InputMaybe<Scalars['Boolean']>
}

export type UserRecordsArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  hasComment: InputMaybe<Scalars['Boolean']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<RecordOrder>
}

export type UserWorksArgs = {
  after: InputMaybe<Scalars['String']>
  annictIds: InputMaybe<Array<Scalars['Int']>>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<WorkOrder>
  seasons: InputMaybe<Array<Scalars['String']>>
  state: InputMaybe<StatusState>
  titles: InputMaybe<Array<Scalars['String']>>
}

/** The connection type for User. */
export type UserConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<UserEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<User>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type UserEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node: Maybe<User>
}

/** An anime title */
export type Work = Node & {
  annictId: Scalars['Int']
  casts: Maybe<CastConnection>
  episodes: Maybe<EpisodeConnection>
  episodesCount: Scalars['Int']
  id: Scalars['ID']
  image: Maybe<WorkImage>
  malAnimeId: Maybe<Scalars['String']>
  media: Media
  noEpisodes: Scalars['Boolean']
  officialSiteUrl: Maybe<Scalars['String']>
  officialSiteUrlEn: Maybe<Scalars['String']>
  programs: Maybe<ProgramConnection>
  reviews: Maybe<ReviewConnection>
  reviewsCount: Scalars['Int']
  satisfactionRate: Maybe<Scalars['Float']>
  seasonName: Maybe<SeasonName>
  seasonYear: Maybe<Scalars['Int']>
  seriesList: Maybe<SeriesConnection>
  staffs: Maybe<StaffConnection>
  syobocalTid: Maybe<Scalars['Int']>
  title: Scalars['String']
  titleEn: Maybe<Scalars['String']>
  titleKana: Maybe<Scalars['String']>
  titleRo: Maybe<Scalars['String']>
  twitterHashtag: Maybe<Scalars['String']>
  twitterUsername: Maybe<Scalars['String']>
  viewerStatusState: Maybe<StatusState>
  watchersCount: Scalars['Int']
  wikipediaUrl: Maybe<Scalars['String']>
  wikipediaUrlEn: Maybe<Scalars['String']>
}

/** An anime title */
export type WorkCastsArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<CastOrder>
}

/** An anime title */
export type WorkEpisodesArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<EpisodeOrder>
}

/** An anime title */
export type WorkProgramsArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<ProgramOrder>
}

/** An anime title */
export type WorkReviewsArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  hasBody: InputMaybe<Scalars['Boolean']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<ReviewOrder>
}

/** An anime title */
export type WorkSeriesListArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
}

/** An anime title */
export type WorkStaffsArgs = {
  after: InputMaybe<Scalars['String']>
  before: InputMaybe<Scalars['String']>
  first: InputMaybe<Scalars['Int']>
  last: InputMaybe<Scalars['Int']>
  orderBy: InputMaybe<StaffOrder>
}

/** The connection type for Work. */
export type WorkConnection = {
  /** A list of edges. */
  edges: Maybe<Array<Maybe<WorkEdge>>>
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<Work>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type WorkEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node: Maybe<Work>
}

export type WorkImage = Node & {
  annictId: Maybe<Scalars['Int']>
  copyright: Maybe<Scalars['String']>
  facebookOgImageUrl: Maybe<Scalars['String']>
  id: Scalars['ID']
  internalUrl: Maybe<Scalars['String']>
  recommendedImageUrl: Maybe<Scalars['String']>
  twitterAvatarUrl: Maybe<Scalars['String']>
  twitterBiggerAvatarUrl: Maybe<Scalars['String']>
  twitterMiniAvatarUrl: Maybe<Scalars['String']>
  twitterNormalAvatarUrl: Maybe<Scalars['String']>
  work: Maybe<Work>
}

export type WorkImageInternalUrlArgs = {
  size: Scalars['String']
}

export type WorkOrder = {
  direction: OrderDirection
  field: WorkOrderField
}

export enum WorkOrderField {
  CreatedAt = 'CREATED_AT',
  Season = 'SEASON',
  WatchersCount = 'WATCHERS_COUNT',
}
