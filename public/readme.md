# Automagic `public` directory

The contents of this folder get copied to s3 buckets defined in the `@static` pragma of your .arc file.

Contents get copied when you run `npm run deploy`.

## Use Caution!

All contents of public will be copied to s3 on each deploy. This will overwrite the existing files in s3 of the same name.

In the case where two resources have identical urls the public asset will take precedence.
