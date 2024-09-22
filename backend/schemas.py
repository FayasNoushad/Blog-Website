from marshmallow import Schema, fields


class BlogSchema(Schema):
    id = fields.Str(dump_only=True)
    title = fields.Str(required=True)
    content = fields.Str(required=True)
    time = fields.Str(dump_only=True)


class BlogsSchema(Schema):
    blogs = fields.List(fields.Nested(BlogSchema))


class BlogEditSchema(Schema):
    id = fields.Str(required=True)
    title = fields.Str()
    content = fields.Str()
    time = fields.Str(dump_only=True)


class BlogDeleteSchema(Schema):
    id = fields.Str(required=True)
