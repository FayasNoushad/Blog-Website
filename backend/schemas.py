from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.Str(dump_only=True)
    username = fields.Str(required=True)
    email = fields.Str(required=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=False)
    password = fields.Str(required=True, load_only=True)
    created_at = fields.Str(dump_only=True)


class GetUserSchema(Schema):
    username = fields.Str()
    email = fields.Str()
    password = fields.Str(required=True)


class BlogSchema(Schema):
    id = fields.Str(dump_only=True)
    title = fields.Str(required=True)
    content = fields.Str(required=True)
    author_id = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
    time = fields.Str(dump_only=True)


class BlogsSchema(Schema):
    blogs = fields.List(fields.Nested(BlogSchema), dump_only=True)
    author_id = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)


class BlogEditSchema(Schema):
    id = fields.Str(required=True)
    title = fields.Str()
    content = fields.Str()
    author_id = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
    time = fields.Str(dump_only=True)


class BlogDeleteSchema(Schema):
    id = fields.Str(required=True)
    author_id = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
