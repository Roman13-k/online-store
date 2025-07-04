"""Create all tables

Revision ID: 7d7ed7e75140
Revises:
Create Date: 2025-06-24 22:58:27.681123

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "7d7ed7e75140"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "books",
        sa.Column("book_id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("image_url", sa.String(), nullable=True),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("description", sa.String(), nullable=False),
        sa.Column("type_book", sa.String(), nullable=False),
        sa.Column("price", sa.Float(), nullable=False),
        sa.Column("author", sa.String(), nullable=False),
        sa.Column("age_reader", sa.Integer(), nullable=False),
        sa.Column("language", sa.String(), nullable=False),
        sa.Column("type_cover", sa.String(), nullable=False),
        sa.Column("publishing", sa.String(), nullable=False),
        sa.Column("isbn", sa.Integer(), nullable=False),
        sa.Column("series", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("book_id"),
    )
    op.create_table(
        "buyers",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("password", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_buyers_email"), "buyers", ["email"], unique=False)
    op.create_table(
        "sellers",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("password", sa.String(), nullable=False),
        sa.Column("type_organization", sa.String(), nullable=False),
        sa.Column("country", sa.String(), nullable=False),
        sa.Column("itn", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("last_name", sa.String(), nullable=False),
        sa.Column("patronymic", sa.String(), nullable=False),
        sa.Column("company_name", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_sellers_email"), "sellers", ["email"], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_sellers_email"), table_name="sellers")
    op.drop_table("sellers")
    op.drop_index(op.f("ix_buyers_email"), table_name="buyers")
    op.drop_table("buyers")
    op.drop_table("books")
    # ### end Alembic commands ###
