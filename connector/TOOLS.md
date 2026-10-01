# Tool catalog

271 tools: 112 read-only, 82 that add or change, 77 that can remove or overwrite.

Generated from the live server's registry. `tools.json` beside this file has the full input schemas.

| Tool | Kind | What it does |
|---|---|---|
| `accept_connection_suggestion` | write | Accept a connection suggestion, draws a permanent edge in the Mind graph. |
| `accept_suggestion` | destructive | Accept one Weave review-queue suggestion by its id (from weave_list_suggestions). A tag row threads the tag through every note it names, a connection draws the edge, an entity link weaves the mention, and an alias... |
| `add_accountability_partner` | destructive | Add a family member as an accountability partner for a habit. They'll be able to see your progress and get notified on misses/streaks. Adding someone who is already a partner replaces their notification settings. |
| `add_checklist_item` | write | Add an item to a checklist |
| `add_comment` | write | Post a comment on a card, as the signed-in person. Suited to leaving an answer, a status update or a hand-off note on the card, where the team will see it. Markdown is rendered. The comment appears in the board's... |
| `add_family_connection` | destructive | Add a family connection between two people. Supports multiple relationship types (e.g., someone can be both a partner AND a parent). Automatically creates the inverse relationship. Adding a connection that already... |
| `add_family_member` | write | Add someone to the household who has no email and no account (a child, a grandparent) so they can be given chores, allowance and points. Owner/admin only, and only in a family workspace. They count against the plan's... |
| `add_meal` | write | Plan a meal into a slot (date × breakfast/lunch/dinner/snack), a saved recipe by id, or free text like 'leftovers' / 'eat out' |
| `add_meal_ingredients_to_list` | write | Put ONE planned meal's ingredients on the shopping list (the grocery list), scaled to that slot's servings, deduped against what's already unchecked, each row keeping provenance back to the meal. |
| `add_meals_to_list` | write | Pull this week's planned meal ingredients onto the shopping list, which makes the week's grocery list from the meal plan. Deduped against what's already there, each row keeping provenance back to its meal or recipe.... |
| `add_shopping_item` | write | Add an item to the household's shopping list, which is where groceries go: 'add chamomile tea to the groceries' and 'put milk on the grocery list' are both this. Files the item by aisle, creates the Groceries list on... |
| `add_whiteboard_elements` | destructive | Draw on a whiteboard: append rectangles, ellipses, diamonds, text, arrows, lines, or freehand strokes from simple specs. clear=true replaces the canvas, which removes what was on it. Coordinates are canvas pixels.... |
| `append_to_note` | write | Append text to the end of an existing note, continuing whatever list or prose the note already uses. Suited to a thought that belongs inside a note the person already keeps, where create_note would start a new one. |
| `apply_template` | write | Apply a template as a card (default), a note, a standalone checklist, a whiteboard, or a set of habits. target chooses which, and variables fill {{placeholders}}. note: body + steps as checkboxes. checklist:... |
| `assign_card` | write | Put a person on a card. A card can carry several assignees; this adds one and leaves the rest alone, and assigning the same person twice changes nothing. The person must already be a member of the card's board,... |
| `assign_chore` | write | Assign a chore to a family member. |
| `assign_label` | write | Assign a label to a card |
| `assign_to_house` | write | Assign a family member to a house for the house points competition. Pass null house_id to unassign. |
| `award_points` | write | Award house points to a family member. Points contribute to their level and their house's total. |
| `check_feature` | read | Check whether a workspace's plan includes a feature (same resolver as the entitlement gate). Fails open. |
| `check_shopping_item` | write | Check an item off the shopping or grocery list, or uncheck it with checked=false. Records who and when. |
| `claim_debt` | write | Send a money-owed record to the person it names so they can agree or disagree. Only works for someone already connected to you here. |
| `claim_shopping_run` | write | Claim the shopping run ('I'm at the store', 'I'll get the groceries') so two people don't both buy milk. release=true hands it back. |
| `clear_reminder` | destructive | Remove/clear a reminder from a card |
| `complete_card` | write | Mark a card as complete |
| `complete_chore` | write | Mark a chore done. It then waits for a parent or admin: nothing is credited and no points move until verify_chore approves it (needs_verification says whether a reward is waiting). When a parent does a chore... |
| `contribute_to_savings_goal` | write | Record a contribution toward a savings goal: the amount is set aside from the member's ledger balance into the goal, with a matching ledger entry in the same transaction. Both are records inside The Margin; no real... |
| `convert_currency` | read | Convert an amount from one currency to another using latest exchange rates |
| `copy_note` | read | Return a whole note as one block of text, title first. Suited to handing a complete note to someone, where get_note returns it in pages. |
| `create_agent_config` | write | Create a new agent configuration |
| `create_allowance` | write | Set up a recurring allowance for a child. On each payday (next_payout_date, then every week, two weeks or month) the amount is recorded on their balance in the family ledger: money owed to them. No money is moved.... |
| `create_allowance_pool` | destructive | Record one pot of pocket money shared between several children by a rule: equal, percentage (values sum to 100) or exact (values sum to the pot). Each child keeps their own allowance row with the resolved amount. A... |
| `create_board` | write | Create a new board. By default no columns are added. A 'columns' array gives custom column names suited to the board's purpose, and 'include_default_columns' true adds generic To Do / In Progress / Done columns. |
| `create_card` | write | Create a new card in a column. The app marks it quietly as added through this connection. |
| `create_chat_thread` | write | Start a chat thread with people you share a workspace with or are connected to. Two people makes a direct thread; more makes a group. |
| `create_checklist` | write | Create a new checklist |
| `create_chore` | write | Create a new chore, optionally with a monetary or points reward, and optional recurrence (daily/weekly/monthly, fair rotation, hard stop date). |
| `create_column` | write | Create a new column in a board |
| `create_debt` | write | Record money lent or borrowed. This is a record only; no money is moved. The other party does not need an account: counterparty_name is a plain name. |
| `create_event` | write | Create a calendar event (time-blocked commitment like meetings, appointments). Events sync to Google Calendar if connected. |
| `create_expense` | write | Record money spent. This is a record only; no payment is made. amount is a positive number in the currency's own units (12.50, not cents). currency defaults to the workspace's own currency, then USD. date defaults to... |
| `create_expense_category` | write | Find or create an expense category by name (case and spacing ignored): an existing one comes back with existing true instead of a duplicate. list_expense_categories shows what is already there. A workspace's default... |
| `create_family_event` | write | Put something on the family calendar: a one-off, a repeating event (rrule), a birthday or an anniversary (kind; they repeat yearly and are all-day by default). Give start_time for a timed event, omit it for all-day.... |
| `create_habit` | write | Find or create a habit by name (case and spacing ignored): an existing habit comes back as it is, streak intact, rather than a duplicate at zero. frequency is daily or weekly; target_count is how many times per day... |
| `create_house` | write | Create a new custom house for the workspace. |
| `create_income` | write | Record money coming in. This is a record only; no money is moved. is_recurring marks a salary or anything that repeats, so it counts every month without being entered again. |
| `create_label` | write | Create a label on a board |
| `create_note` | write | Create a new note. The app marks it quietly as added through this connection. |
| `create_note_folder` | write | Create a folder in the notes tree, or return the one already there. It is find-or-create on purpose: sibling names are unique, so if a folder with this name already sits under this parent it comes back with... |
| `create_pact` | write | Start a pact with you as its first seat, bound to your own token. `invite` names the other parties; each takes its seat with join_pact using its own token, and until then it can write nothing. The workspace matters:... |
| `create_recipe` | write | Save a recipe (structured ingredients + steps), the reusable unit meal-plan slots point at |
| `create_savings_goal` | write | Create a savings goal for a family member (e.g. saving up for something). Any member, including a child, can create one for themselves. |
| `create_shopping_list` | write | Create a named shopping list, such as Groceries or Hardware. |
| `create_template` | write | Create a new card template |
| `create_whiteboard` | write | Create a whiteboard. Optionally seed it with an Excalidraw document and link it to a card. |
| `deduct_points` | write | Deduct house points from a family member. Points cannot go below zero. |
| `delete_agent_config` | destructive | Delete an agent configuration |
| `delete_attachment` | destructive | Delete an attachment (removes the stored object and the record). |
| `delete_budget` | destructive | Delete a budget envelope, its logged expenses remain. Agents cannot undo this. |
| `delete_canva_design` | destructive | Delete a Canva design record from the workspace. |
| `delete_card` | destructive | Delete a card and everything on it, agents cannot undo this. When the user means 'done', complete_card is the right tool. |
| `delete_checklist` | destructive | Delete a checklist and all its items |
| `delete_checklist_item` | destructive | Delete a checklist item |
| `delete_column` | destructive | Delete a column (optionally move cards to another column first) |
| `delete_comment` | destructive | Delete one of your own comments; someone else's is refused. This matches the card UI, which only offers delete on your own comment. |
| `delete_default_columns` | destructive | Delete default columns only if they have no cards |
| `delete_expense` | destructive | Delete an expense record, agents cannot undo this. For a wrong amount, update_expense is the right tool. |
| `delete_family_event` | destructive | Remove a family calendar event. For a repeating event, occurrence_date and scope say which dates are removed: this, following or all. The three scopes remove different sets of dates. |
| `delete_income` | destructive | Remove a recorded income |
| `delete_label` | destructive | Delete a label and remove it from every card that carries it, agents cannot undo this. |
| `delete_note` | destructive | Delete a note, agents cannot undo this, and wikilinks pointing at it break. |
| `delete_note_folder` | destructive | Delete a folder and its sub-folders. `mode` says what happens to the notes inside. The notes are not deleted by default: mode='orphan' (the default) moves every note in the folder and its sub-folders to the top level... |
| `delete_recipe` | destructive | Delete a recipe. Planned meals that used it keep their title as free text, the week never blanks. Agents cannot undo this. |
| `delete_savings_goal` | destructive | Delete a savings goal. Anything recorded in it is first credited back to the member's ledger balance as a ledger entry. |
| `delete_template` | destructive | Delete a card template |
| `delete_whiteboard` | destructive | Delete a whiteboard. |
| `dismiss_connection_suggestion` | write | Dismiss a connection suggestion so the pair never resurfaces. |
| `dismiss_suggestion` | write | Dismiss one Weave review-queue suggestion by its id. It stays readable at weave_list_suggestions(status='dismissed') and the person can restore it in the Margin app. |
| `embed_canva_design` | write | Place a design's rendered pages onto a whiteboard as image elements, the way a person would drop them in, so the design can be annotated or built on. Requires a design that has rendered pages. Existing images are... |
| `end_focus_session` | write | End a running focus session (status completed by default, or cancelled / interrupted). The length is measured from its start, in whole minutes. A session that ran under one minute is saved as cancelled with 0... |
| `end_house_cup_season` | destructive | End or cancel an active House Cup season. Calculates winner from season point transactions. A season that has ended or been cancelled cannot be reopened. |
| `export_memory` | read | Export the durable AI memory of a workspace as a portable 'margin.brain' JSON document: the facts The Margin has stored about the person from their own notes, cards and activity in The Margin, the patterns it has... |
| `export_recipes` | read | Every recipe in the workspace as a margin-recipes file, the same format the web's Export button produces and the import lane reads back. |
| `export_whiteboard_png` | read | Get a signed URL to the latest PNG of a whiteboard, as its author drew it. The PNG is the render the app saved from the drawing; nothing is generated by a model. |
| `finish_shopping_run` | destructive | Wrap up a grocery or shopping run at the till in one act: hand the run back, clear the checked non-staples (staples are kept), and optionally log what it cost to Expenses with provenance back to the list. |
| `get_active_season` | read | Get the currently active House Cup season with current house standings. |
| `get_active_session` | read | Get the current active focus session, if any |
| `get_agent_config` | read | Get an agent configuration by ID |
| `get_attachment` | read | Get an attachment's metadata and a short-lived signed URL to the original full-resolution file. |
| `get_board` | read | Get a board with its columns and cards |
| `get_board_snapshot` | read | Get the entire board state in one call: columns, cards, each card's linked notes and whiteboards (signed PNG), and all attachments (signed URLs). Suited to loading a whole board at the start of a session. Leaves a... |
| `get_board_summary` | read | Board statistics: total/completed/overdue card counts, per-column totals, and the next five cards due. Cheaper than get_board when you only need the shape of a board, not its contents. |
| `get_budget` | read | Get a single budget by ID, with spend-to-date for its period |
| `get_canva_design` | read | Read a Canva design in full: its metadata, signed per-page image URLs (the pixels exactly as the designer made them), and the extracted structured content, with text blocks and their positions, palette and fonts.... |
| `get_card` | read | Get a card by ID. The description is paged: when description_has_more is true, offset=description_next_offset returns the next part. Leaves a 'seen by agent' entry in the board's activity feed, at most one an hour... |
| `get_cards` | read | Read many cards' details in one call (max 50 ids; each description capped at about 4000 chars with continuation metadata). Cheaper than repeated get_card when several cards are needed; get_card(offset=...) pages a... |
| `get_checklist` | read | Get a checklist with all its items |
| `get_debt_history` | read | Who claimed what about a debt, who answered, when and why |
| `get_exchange_rates` | read | Get latest exchange rates for currency conversion. Returns rates relative to a base currency (default USD). |
| `get_expense` | read | Get a single expense by ID |
| `get_expense_summary` | read | Spending for today, this week (weeks start on Monday) or this month: total, count and per-category totals. Amounts in different currencies are not converted here; get_expense_summary_multi_currency converts them, and... |
| `get_expense_summary_multi_currency` | read | Get a comprehensive expense summary with per-currency breakdowns and a grand total converted to your preferred currency |
| `get_family_activity_feed` | read | Get recent family activity including expense splits, habit completions, and settlements. |
| `get_family_balances` | read | Get a summary of who owes whom in the family. Shows unsettled expense splits aggregated by currency. |
| `get_family_context` | read | Get the family context stored in The Margin: members, saved preferences, routines, spending patterns and shared goals. |
| `get_family_daily_summary` | read | Get a summary of all family activity for a specific day. |
| `get_family_expense_report` | read | Get a comprehensive expense report showing spending by each family member, including who owes what. |
| `get_family_habit_comparison` | read | Compare habit completion rates across family members over a date range. |
| `get_family_member` | read | Get detailed family profile for a specific member including sharing preferences and recent activity stats. |
| `get_family_presence` | read | Get a snapshot of family members' current status - who's online, who's focusing, and their current activities. |
| `get_focus_summary` | read | Focus totals for today, this week (weeks start on Monday) or this month: session count, total and average minutes, and a per-day breakdown. Only completed sessions count, so anything cut short or under a minute is... |
| `get_habit` | read | Get a habit with recent entries |
| `get_ledger_balance` | read | Get each family member's money-ledger balance, grouped by currency. Never sums across currencies. |
| `get_meal_plan` | read | The week's meal plan (Monday to Sunday of the week containing week_of): every slot with recipe context, plus the family's stored meal preferences. This is the context a new week's plan is built from. |
| `get_meal_preferences` | read | The family's standing meal preferences (dietary constraints, dislikes, default servings). These apply to every week that is planned. |
| `get_money_summary` | read | The month in one answer: what came in, what went out, what is left, what share of income the budgets commit, and what is owed either way. Suited to questions about whether something is affordable. |
| `get_note` | read | Get a note with full content. The content is paged: when content_has_more is true, offset=content_next_offset returns the next part. include_media=true also resolves every attached image as a signed URL to the... |
| `get_notes` | read | Read many notes' content in one call (max 50 ids; each capped at about 4000 chars with continuation metadata). Cheaper than repeated get_note when several notes are needed; get_note(offset=...) pages a long one. |
| `get_pact` | read | Read a Pact. Without `since`: the whole thing, with participants (and handshake notes), every zone section, the newest thread messages (200, or `messages_limit`) with a total count, and every open decision. With... |
| `get_partner_habit_progress` | read | View an accountability partner's habit progress. You must be their accountability partner to see this. |
| `get_planned_ingredients` | read | The week's shopping lines, aggregated across planned meals, the frozen seam the shopping list consumes: name, quantity, aisle, and provenance back to the meal + recipe |
| `get_point_history` | read | Get the history of point transactions. Optionally filter by user. |
| `get_points_leaderboard` | read | Get the family points leaderboard showing individual rankings and house standings. |
| `get_recipe` | read | Get a full recipe (ingredients + steps) by ID |
| `get_season_leaderboard` | read | Get house standings and top individual scorers for a specific season. |
| `get_team_workload` | read | Roll up open (incomplete) cards across every board you can open in a workspace: how many each teammate is carrying, how many are overdue, and which cards nobody has been assigned. Answers 'who is overloaded?', 'what... |
| `get_template` | read | Get a card template by ID |
| `get_user_family_roles` | read | Get all the family roles a user has (e.g., they might be both a 'partner' and a 'parent_of' different people). |
| `get_user_streak` | read | Get a user's current chore streak, longest streak, and next milestone bonus info. |
| `get_whiteboard` | read | Get a whiteboard's metadata and a signed PNG URL of the latest render. include_document=true adds the raw Excalidraw scene JSON; offset/max_chars read a huge scene as paged text (document_text with continuation... |
| `get_workspace_currency_settings` | read | Get currency settings for a workspace including default and display currencies |
| `get_workspace_type` | read | Get the type of a workspace (personal, family, team, or shared). Family workspaces have special collaboration features. |
| `hide_from_memory` | destructive | Hide an item from AI memory permanently (reaped within ~15 minutes). |
| `import_canva_design` | write | Import a Canva design from a share link (no Canva account needed). Records the design and fetches its cover preview. Full-fidelity pages and editable extraction come from an export a person uploads, or from... |
| `import_recipe_from_url` | write | Fetch a recipe page the person names (public http(s) only) and save the recipe its structured data describes, read as schema.org Recipe data (https://schema.org/Recipe; the importer is documented at... |
| `initialize_houses` | write | Initialize 4 default houses (Phoenix, Dragon, Griffin, Kraken) for the workspace. Safe to call multiple times - will not duplicate. |
| `invite_to_pact` | write | Open a seat on a pact you are already in, so another agent can join it. The seat stays empty until that agent calls join_pact with its own token, which finds this pact by itself. Inviting the same handle twice... |
| `join_pact` | write | Take the seat a pact's creator reserved for you, with your own token. This is your consent: your credential binds the seat, and only then can it post and write its state page. One token, one seat. With no arguments... |
| `learn_from_interaction` | write | Save one short pattern about how the family uses The Margin (for example 'groceries are usually bought on Saturday'), as a single sentence in `pattern`. Only the fields passed here are stored; no conversation text is... |
| `list_accountability_partners` | read | List all accountability partners for a specific habit with their notification settings. |
| `list_agent_configs` | read | List agent configurations |
| `list_agent_definitions` | read | List agent definitions, the agent bodies. One definition is used by many workspaces; each workspace's changes live on its instance. |
| `list_agent_instances` | read | List a workspace's agent instances: which definitions it uses and which fields (if any) it overrode. |
| `list_allowances` | read | List the workspace's allowances (optionally one child's), soonest payday first: amount, currency, frequency, next_payout_date and auto_payout. A next_payout_date in the past means a payday nobody has added yet. What... |
| `list_attachments` | read | List attachments on a card, note, or whiteboard (metadata only, no URLs). Returns up to 1000 per call (limit, default and max 1000); offset skips rows for the next page. A page of exactly limit rows means there may... |
| `list_board_labels` | read | List all labels for a specific board |
| `list_boards` | read | List all boards in the workspace |
| `list_budgets` | read | List this workspace's budgets with spend-to-date, remaining, percent used and status for the current budget period |
| `list_canva_designs` | read | List Canva designs in the workspace (title, status, page count, links, timestamps). |
| `list_card_assignees` | read | Who is on the hook for this card, with names and when they took it. Shows whether someone already has the card, and answers 'whose card is this?'. get_team_workload gives the whole team's load at once. |
| `list_chat_messages` | read | Read a chat thread you are in, oldest first, with reactions |
| `list_chat_threads` | read | Chat threads you are in, newest first, with how many unread |
| `list_checklists` | read | List all checklists in the workspace |
| `list_chores` | read | List chores in a workspace. Can filter by assignee and completion status. A recurring chore shows only its current occurrence: earlier ones nobody ticked, once a newer one exists, are folded into missed_recently on... |
| `list_columns` | read | List all columns in a board |
| `list_comments` | read | Read the comment thread on a card, oldest first, with each author's name. This is the discussion around a task (decisions, blockers, 'I'll take this', why a due date moved), and none of it lives in the card's own... |
| `list_connection_suggestions` | read | Pending AI-discovered connection suggestions for the user's Mind graph (pre-generated, reviewing costs nothing). |
| `list_connections` | read | List your accepted connections (friend circle). |
| `list_cross_workspace_pins` | read | List all items pinned from other workspaces that are displayed in the target workspace. |
| `list_debts` | read | List money owed to or by this workspace, with balances. Returns 200 per call by default (limit, max 500). count is the total that match, returned is the size of this page, and has_more with next_offset says whether... |
| `list_expense_categories` | read | List the workspace's expense categories in display order. These are the categories create_expense's category_id refers to. |
| `list_expense_splits` | read | Get all split details for a specific expense, showing who paid and who owes what. |
| `list_expenses` | read | List expenses with optional date filtering |
| `list_family_connections` | read | List all family connections in a workspace, showing the relationship graph. Optionally filter to a specific user's connections. |
| `list_family_events` | read | What is on the family calendar between two dates. Repeating events come back as their occurrences, birthdays with the age they mark. Each occurrence carries event_id and occurrence_date, which update_family_event and... |
| `list_family_members` | read | List all family members in the workspace with their roles (partner, parent, child, caretaker, roommate), nicknames, and sharing preferences. Each member reports `kind`, 'person' (has an account) or 'profile' (a... |
| `list_focus_sessions` | read | List focus sessions with optional filters |
| `list_habits` | read | List the habits in the workspace. Returns up to 1000 per call (limit, default and max 1000); offset skips rows for the next page. A page of exactly limit rows means there may be more. |
| `list_hidden` | read | Items currently hidden from AI memory. Returns 200 per call by default (limit, max 500). count is the total hidden, returned is the size of this page, and has_more with next_offset says whether to ask again with offset. |
| `list_income` | read | List money coming in, with optional date filtering |
| `list_labels` | read | List all labels in the workspace |
| `list_ledger_entries` | read | List family ledger entries, most recent first. Filter by member, entry type, or currency. |
| `list_mind_connections` | read | The accepted edges of the user's Mind graph. |
| `list_note_folders` | read | The workspace's notes tree: every folder, its parent, and how many notes it holds. It shows whether a folder someone names ('file it under Recipes', 'add to my Journal') exists and what it is called. Returned flat,... |
| `list_notes` | read | List notes in the workspace. Each unlocked note includes a content_preview (first 1200 chars); get_note returns the full body. |
| `list_pacts` | read | List the Agent Pacts (cross-agent collaboration contracts): the ones you are seated in, and the active ones with a seat still open for you to take with join_pact. With no workspace_id it searches every workspace your... |
| `list_pending_connections` | read | List your pending incoming + outgoing connection requests. |
| `list_recipes` | read | List this workspace's recipes as previews (title, tags, times, ingredient count). get_recipe returns one in full. |
| `list_reminders` | read | List all upcoming reminders in the workspace |
| `list_resource_shares` | read | List the users a note/whiteboard/canva design/checklist is shared with. |
| `list_savings_goals` | read | List savings goals in the workspace, optionally filtered to one member. |
| `list_seasons` | read | List all House Cup seasons for the workspace, ordered by most recent. |
| `list_shopping_items` | read | The items on a shopping list or grocery list (default: the household's first list, normally Groceries), in walk-the-store aisle order, with the run-claim state. Answers 'what is on the grocery list?' and 'what do we... |
| `list_shopping_lists` | read | The household's shopping lists: the grocery list (Groceries) and any others, such as Hardware. Each comes with its open-item count and who, if anyone, has claimed the current run. |
| `list_supported_currencies` | read | List all supported currencies with their codes, names, symbols, and country flags |
| `list_templates` | read | List the card templates in the workspace. Returns up to 1000 per call (limit, default and max 1000); offset skips rows for the next page. A page of exactly limit rows means there may be more. |
| `list_user_workspaces` | read | List all workspaces the account this token belongs to is a member of, with their type and role in each. It cannot list another person's workspaces. |
| `list_whiteboards` | read | List whiteboards in the workspace (id, title, folder, linked card, timestamps). |
| `list_workspace_members` | read | List everyone in a workspace with their role (owner, admin or member) and when they joined. Answers 'who is on this team?' and shows who can grant access to something. |
| `list_workspaces` | read | List the workspaces you can reach, and which one is active. Each row says `authorized` (your token may act there, by passing its id as workspace_id or after switch_workspace) or `visible_only` (the person is a member... |
| `log_habit_entry` | destructive | Log a habit as done on a date (YYYY-MM-DD, default today). One entry per habit per day: logging the same day again replaces its count and note rather than adding a second entry. remove_habit_entry undoes it. |
| `look_at_whiteboard` | read | Return a whiteboard as a PICTURE, the way its owner sees it. Suited to questions about how a board LOOKS (layout, colour, composition, style, whether it feels crowded) and to making something in the same style.... |
| `manage_pin` | destructive | Set, change, or remove a 6-digit PIN lock on a board or note. Only the owner can manage PINs. Changing or removing a PIN always requires the current PIN. Setting a PIN on an already-locked entity also requires the... |
| `move_card` | write | Move a card to a different column |
| `pin_cross_workspace_item` | destructive | Pin an item (expense, habit, checklist, board, card, or note) from one workspace to display in another workspace for quick access. Pinning an item that is already pinned there replaces the pin's display settings. |
| `plan_week` | destructive | Plan a whole week in one call, atomically. Every entry must fall inside the week `week_of` names. `replace` clears that week's existing meals first, inside the same transaction, so a failure cannot leave it empty. |
| `post_pact_message` | write | Append a message to the Pact thread, as YOUR resolved participant, through The Margin's Agent Pacts API (documented at https://themarginapp.com/docs/agent-pacts). Append-only, there is no edit or delete tool, and... |
| `raise_pact_decision` | write | Raise an open decision for the human to rule on. No tool resolves a decision; that is deliberately human-only. |
| `react_to_chat_message` | destructive | React to a message in a chat thread you are in, as yourself. One row per person per emoji, so this never replaces anyone else's reaction. remove=true takes your own reaction back off. |
| `recipe_steps_to_checklist` | write | Turn a recipe's method into a checklist that can be ticked off while cooking. The checklist is saved in the workspace like any other and syncs offline. |
| `record_debt_payment` | write | Record a payment that was made against a debt. This records the payment; it does not send or move money. A negative amount records more lent on the same arrangement. A payment that clears the balance marks the debt... |
| `record_family_activity` | write | Add an entry to the family's activity feed, where family members see it. |
| `record_ledger_adjustment` | write | Record a signed correction on a family member's ledger. It is the one entry type whose sign the caller chooses, and it requires a non-empty reason. A record only; no money is moved. |
| `record_ledger_entry` | write | Record a money event on a family member's ledger. The ledger is a record of what is owed; no money is moved. amount is positive and the sign comes from entry_type. Credits (money owed to them): chore_earning,... |
| `record_meal_cooked` | write | Record that a meal was actually cooked: marks the planned slot done and bumps the recipe's cooked count and last-cooked date, so the box can be ranked by what this household really eats. Give a meal_id for something... |
| `refresh_exchange_rates` | write | Fetch the latest exchange rates from the public rate feed and store them. Other currency tools then answer from the refreshed rates. |
| `remove_accountability_partner` | destructive | Remove an accountability partner from a habit. |
| `remove_connection` | destructive | Remove a connection between you and another user (by other_user_id). |
| `remove_family_connection` | destructive | Remove a specific family connection between two people. |
| `remove_habit_entry` | destructive | Remove a habit entry for a specific date |
| `remove_label` | destructive | Remove a label from a card |
| `remove_meal` | destructive | Remove a planned meal from the week |
| `remove_meal_ingredients_from_list` | destructive | Take back what ONE planned meal put on the shopping list. Unchecked rows only, something already in the trolley is not un-bought because the plan changed. |
| `remove_shopping_item` | destructive | Delete an item from the shopping or grocery list. |
| `reorder_cross_workspace_pins` | write | Update the display order of cross-workspace pins. |
| `respond_connection_request` | write | Accept or decline an incoming connection request (by connection_id). |
| `respond_to_debt_claim` | write | Agree or disagree with a money-owed record someone has sent you, with an optional reason. |
| `save_checklist_as_template` | write | Save a standalone checklist into the reusable template library |
| `search_canva_designs` | read | Find Canva designs in the workspace by title or extracted text content. |
| `search_cards` | read | Search cards by title and description |
| `search_notes` | read | Search notes by title and content. Each hit includes a content_preview (first 1200 chars); get_note returns the full body. |
| `search_recipe_catalog` | read | Search public recipe catalogs by dish, cuisine or main ingredient. Returns merged listings: one entry per dish carrying sources (every place it came from, with credit and license), images (each with its own credit... |
| `send_chat_message` | write | Send a message in a chat thread you are in, as yourself, through The Margin's chat API (documented at https://themarginapp.com/docs/chat). |
| `send_connection_request` | write | Send a friend-circle connection request to a Margin user by email. If they already requested you, this accepts it. Emits a notification. |
| `set_budget` | destructive | Set a spending budget for a category, updates the existing active budget for that category and period, or creates one |
| `set_meal_preferences` | destructive | Update the family's standing meal preferences (only provided fields change), stored once on the workspace so nobody repeats 'vegetarian' every week |
| `set_reminder` | destructive | Set a reminder for a card at a specific time, replacing any reminder already on it. The person is notified in the browser or by email when it triggers. |
| `set_workspace_type` | destructive | Set the type of a workspace. 'family' enables expense splitting, habit accountability, and family features. 'team' enables team collaboration. 'shared' allows cross-workspace sharing. |
| `settle_balance` | write | Record that one family member paid another back. This records a settlement that happened outside The Margin (cash, a bank transfer, or forgiven); it does not send or move money. |
| `settle_debt` | write | Mark a debt record as settled or forgiven, or reopen it. This changes the record's status only; no money is moved. |
| `share_resource` | destructive | Share a note, whiteboard, Canva design, or checklist with a specific Margin user by email (viewer or editor). They get access and a notification on every call. Sharing again with someone who already has access... |
| `split_expense` | destructive | Split an existing expense between family members: equal shares, percentages or exact amounts. The expense must already exist (create_expense records one). Splitting an expense again replaces its earlier split. This... |
| `start_focus_session` | write | Start a focus session for the signed-in person, optionally on a card (its board is recorded too). duration_minutes is the planned length; the real length is measured when it ends. get_active_session shows whether one... |
| `start_house_cup_season` | destructive | Start a new House Cup season. Creates a time-boxed competition between houses. A season that is already running is marked completed first, and that cannot be undone. |
| `store_family_preference` | write | Save one family preference the person has stated, as a short name and value (for example a dietary restriction or a preferred meeting time), so Margin Intelligence can take it into account later. Only the name, value... |
| `suggest_settlement` | read | Work out the smallest set of payments that would balance what family members owe each other. Read-only arithmetic over the recorded splits: it records nothing and moves no money. |
| `switch_workspace` | write | Switch to a different workspace. All subsequent tool calls (create cards, list expenses, etc.) operate on it. The target must be one your token was granted at authorization: anything else comes back `success: false`... |
| `toggle_checklist_item` | write | Toggle a checklist item's checked state |
| `unassign_card` | destructive | Take a person off a card, leaving any other assignees in place. Suited to work changing hands or someone covering for a person who is away. Removing someone who was not assigned is not an error: it reports... |
| `unhide_from_memory` | write | Allow a previously-hidden item back into AI memory. |
| `unpin_cross_workspace_item` | destructive | Remove a cross-workspace pin. |
| `unshare_resource` | destructive | Remove one person's access to a shared note, whiteboard, Canva design or checklist. user_id is the person losing access, as returned by list_resource_shares; they do not need to be in the workspace. The answer says... |
| `update_agent_config` | destructive | Update an agent configuration |
| `update_allowance` | destructive | Change an allowance's amount, frequency, next payday, pause state or auto_payout. Only the fields passed change. A missed payday is added by hand with record_ledger_entry (entry_type allowance, source_type allowance,... |
| `update_budget` | destructive | Update an existing budget's limit, period, category or active flag |
| `update_card` | destructive | Update card fields (only provided fields are changed) |
| `update_checklist` | destructive | Rename a checklist or change its icon, colour or category. Only the fields you pass are changed; the rest are left alone. |
| `update_checklist_item` | destructive | Edit a checklist item's title, note, priority or category |
| `update_chore` | destructive | Update a chore's fields, or its recurrence (frequency, rotation pool, end date, pause). |
| `update_column` | destructive | Update column properties |
| `update_comment` | destructive | Rewrite one of your own comments; someone else's is refused. Replaces the whole body. list_comments returns the current body, for adding to it rather than replacing it. |
| `update_expense` | destructive | Update expense fields |
| `update_family_event` | destructive | Change a family calendar event. For a repeating event, occurrence_date and scope say which dates change: this (only that date), following (that date and every later one) or all (the whole series; a moved date shifts... |
| `update_family_settings` | destructive | Update your family role (partner, parent, child, caretaker, roommate), nickname, emoji avatar, and sharing preferences. |
| `update_habit` | destructive | Update habit fields |
| `update_income` | destructive | Change a recorded income. ended_on stops a standing arrangement, such as a job that has finished. |
| `update_label` | destructive | Update label properties |
| `update_meal` | destructive | Edit or move a planned meal: another day/slot, swap the recipe, scale servings, assign the cook, or mark it done |
| `update_note` | destructive | Update note fields |
| `update_note_folder` | destructive | Rename, restyle or move a folder; only what is passed is changed. parent_id nests it under another folder, and move_to_root:true brings it to the top level. A move that would put a folder inside its own subtree is... |
| `update_pact_handshake` | destructive | Set your own short handshake/status note on this Pact (max about 280 chars) and bump your last-active timestamp. It only ever writes your own seat's note. The result carries since_you_last_wrote. |
| `update_pact_section` | destructive | Rewrite YOUR OWN zone section in a Pact, through The Margin's Agent Pacts API (documented at https://themarginapp.com/docs/agent-pacts). Refused if the section belongs to another participant or is frozen (no owner).... |
| `update_recipe` | destructive | Update a recipe's fields (only provided fields change) |
| `update_shopping_item` | destructive | Rename an item on the shopping or grocery list, move it to another aisle, change its quantity, or flip its staple flag. |
| `update_template` | destructive | Update card template fields |
| `update_whiteboard` | destructive | Update a whiteboard's title, folder, linked card/board, or Excalidraw document. |
| `update_workspace_currency_settings` | destructive | Update currency settings for a workspace |
| `upload_attachment` | write | Upload a file (base64 or source URL) onto a card, note, or whiteboard. Use for proof screenshots and reference images. Returns metadata + signed URL. |
| `vault_status` | read | Vault overview (read-only, unlocking and sealing live in the Margin app). |
| `verify_chore` | write | Approve a completed chore (a parent or admin; a child is refused) and release its reward once. Points go to the person who did it, with the early or late modifier, streak and level. A money reward is recorded on... |
| `weave_list_suggestions` | read | The Weave review queue: proposed tags, connections and entity links. |
