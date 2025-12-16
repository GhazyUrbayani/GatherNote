const { mysqlTable, int, varchar, text, longtext, boolean, datetime, mysqlEnum, unique } = require('drizzle-orm/mysql-core');
const { relations } = require('drizzle-orm');

// Enums (Case sensitive, sesuaikan dengan isi SQL: 'completed', 'ongoing', dll)
const noteStatusEnum = mysqlEnum('note_status', ['unstarted', 'ongoing', 'completed', 'archived']); 
const noteVisibilityEnum = mysqlEnum('note_visibility', ['private', 'public', 'group']);

// 1. Users table
const users = mysqlTable('users', {
  user_id: int('user_id').primaryKey().autoincrement(),
  username: varchar('username', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password_hash: varchar('password_hash', { length: 255 }).notNull(),
  avatar_url: varchar('avatar_url', { length: 500 }),
  created_at: datetime('created_at').notNull().default(new Date()),
  updated_at: datetime('updated_at').notNull().default(new Date()),
});

// 2. Folders table
const folders = mysqlTable('folders', {
  folder_id: int('folder_id').primaryKey().autoincrement(),
  user_id: int('user_id').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  topic: text('topic'),
  color: varchar('color', { length: 50 }),
  icon: varchar('icon', { length: 100 }),
  is_pinned: boolean('is_pinned').notNull().default(false),
  created_at: datetime('created_at').notNull().default(new Date()),
  updated_at: datetime('updated_at').notNull().default(new Date()),
});

// 3. Notes table
const notes = mysqlTable('notes', {
  note_id: int('note_id').primaryKey().autoincrement(),
  user_id: int('user_id').notNull(),
  folder_id: int('folder_id'),
  title: varchar('title', { length: 500 }).notNull(),
  content: longtext('content'),
  note_status: noteStatusEnum.notNull().default('unstarted'),
  priority: varchar('priority', { length: 50 }),
  progress: int('progress'),
  is_favorite: boolean('is_favorite').notNull().default(false),
  visibility: noteVisibilityEnum.notNull().default('private'),
  created_at: datetime('created_at').notNull().default(new Date()),
  updated_at: datetime('updated_at').notNull().default(new Date()),
});

// 4. Groups table
const groups = mysqlTable('groups', {
  group_id: int('group_id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 500 }),
  group_code: varchar('group_code', { length: 100 }).notNull().unique(),
  created_by: int('created_by'),
  created_at: datetime('created_at').notNull().default(new Date()),
  updated_at: datetime('updated_at').notNull().default(new Date()),
});

// 5. Group Members table
const groupMembers = mysqlTable('group_members', {
  member_id: int('member_id').primaryKey().autoincrement(),
  group_id: int('group_id').notNull(),
  user_id: int('user_id').notNull(),
  role: varchar('role', { length: 50 }).notNull().default('member'),
  joined_at: datetime('joined_at').notNull().default(new Date()),
});

// 6. Note Collaborators table
const noteCollaborators = mysqlTable('note_collaborators', {
  collaborator_id: int('collaborator_id').primaryKey().autoincrement(),
  note_id: int('note_id').notNull(),
  user_id: int('user_id').notNull(),
  permission: varchar('permission', { length: 50 }).notNull().default('view'),
  shared_at: datetime('shared_at').notNull().default(new Date()),
}, (table) => ({
  uniqueNoteUser: unique().on(table.note_id, table.user_id),
}));

// --- RELATIONS ---
const usersRelations = relations(users, ({ many }) => ({
  notes: many(notes),
  folders: many(folders),
  memberships: many(groupMembers),
  collaborations: many(noteCollaborators),
}));

const foldersRelations = relations(folders, ({ one, many }) => ({
  owner: one(users, {
    fields: [folders.user_id],
    references: [users.user_id],
  }),
  notes: many(notes),
}));

const notesRelations = relations(notes, ({ one, many }) => ({
  owner: one(users, {
    fields: [notes.user_id],
    references: [users.user_id],
  }),
  folder: one(folders, {
    fields: [notes.folder_id],
    references: [folders.folder_id],
  }),
  collaborators: many(noteCollaborators),
}));

const groupsRelations = relations(groups, ({ many }) => ({
  members: many(groupMembers),
}));

const groupMembersRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, {
    fields: [groupMembers.group_id],
    references: [groups.group_id],
  }),
  user: one(users, {
    fields: [groupMembers.user_id],
    references: [users.user_id],
  }),
}));

const noteCollaboratorsRelations = relations(noteCollaborators, ({ one }) => ({
  note: one(notes, {
    fields: [noteCollaborators.note_id],
    references: [notes.note_id],
  }),
  user: one(users, {
    fields: [noteCollaborators.user_id],
    references: [users.user_id],
  }),
}));

module.exports = {
  users,
  folders,
  notes,
  groups,
  groupMembers,
  noteCollaborators,
  usersRelations,
  foldersRelations,
  notesRelations,
  groupsRelations,
  groupMembersRelations,
  noteCollaboratorsRelations,
};